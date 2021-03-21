<script lang="ts">
import { afterUpdate } from 'svelte';
import { CurrentTheme } from './CurrentTheme';
import type { InterfaceTheme } from './InterfaceTheme';

  let theme : InterfaceTheme;

  $: theme = $CurrentTheme;

  afterUpdate(() => {

    document.body.classList.forEach((i) => {
      if(i.match(/theme-.*/)) {
        document.body.classList.remove(i);
      }
    });

    document.body.classList.add('theme-' + theme.name);

    if(document.body.querySelector('style.theme-' + theme.name) != null) {
      return;
    }

    let styleNode = document.createElement('style');
    styleNode.classList.add('theme-' + theme.name);
    styleNode.innerHTML = `
    body.theme-${theme.name} {
      ${Object.entries(theme.variables).map(([key, value]) => {
        return `--${key}: ${value};`; 
      }).join('\n')}
    }
    `;
    document.body.append(styleNode);
  });
</script>
<slot></slot>