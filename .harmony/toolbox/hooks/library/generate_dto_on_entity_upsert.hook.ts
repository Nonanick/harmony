import { Entity, IEntity, IPropertyType, Property } from 'clerk';
import { promises as fs } from 'fs';
import path from 'path';
import * as ts from 'typescript';
import ProjectRoot from '../../../project.root';
import { ProjectHook } from '../project.hook';

const TypescriptFilePrinter = ts.createPrinter({});

const DTOsFolder = path.join(ProjectRoot, 'projects', 'library', 'src', 'entities', 'dtos');

const GenerateDTOOnEntityUpsert: ProjectHook = {
  name: "Generate DTO on entity Update/Insert",
  event: ["add", "change"],
  pattern: [/\.entity\.js$/],
  async hook({filepath : pathString}) {
    import(pathString).then(module => {
      let entity = module.default;
      let tsAST = GenerateDTOFromEntity(entity);
      let fileSrc = path.join(
        DTOsFolder, `${entity.name}.dto.ts`
      );

      let sourceFile = ts.createSourceFile(fileSrc, '', ts.ScriptTarget.Latest);

      let fileContent = TypescriptFilePrinter.printNode(
        ts.EmitHint.Unspecified,
        tsAST,
        sourceFile
      );

      fs.writeFile(fileSrc, fileContent, { flag: 'w+' });

    })

  }
};


export function GenerateDTOFromEntity(entityDefinition: IEntity) {

  let entity = new Entity(entityDefinition);

  let factory = ts.factory;
  let dtoName = entity.name.split(/_-/).map(name => name.charAt(0).toLocaleUpperCase() + name.substr(1)).join('') + 'DTO';

  return factory.createInterfaceDeclaration(
    undefined,
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    factory.createIdentifier(dtoName),
    undefined,
    undefined,
    [
      ...Object.entries(entity.properties).map(([name, prop]) => {
        return CreatePropertySignature(name, prop);
      })
    ]

  )
}

export function CreatePropertySignature(name: string, property: Property) {

  let factory = ts.factory;

  return factory.createPropertySignature(
    undefined,
    factory.createIdentifier(name),
    property.isRequired() ? undefined : factory.createToken(ts.SyntaxKind.QuestionToken),
    CreatePropertyType(property.getType()),
  );

}

export function CreatePropertyType(type: IPropertyType) {
  return GetFromRawType(type);
}

function GetFromRawType(type: IPropertyType) {
  let factory = ts.factory;

  switch (type.raw) {
    case String:
      return factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
    case Number:
      return factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
    case Boolean:
      return factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword);
    case Date:
      return factory.createTypeReferenceNode(factory.createIdentifier('Date'), undefined);
    default:
      return factory.createTypeReferenceNode(factory.createIdentifier(type.name), undefined);
  }
}

export default GenerateDTOOnEntityUpsert;