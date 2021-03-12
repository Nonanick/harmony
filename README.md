# Harmony Mono Repo
------------------

Workspace for creating things using self built stack!

> Seriously I DO NOT RECCOMEND IT, absolutelly NOTHING is past version 0.1;

The idea of this repo is build tools for automating "boring" processes, like:
- Typescript type creation;
- Controller and services binding;
- Data modeling and validation;
and also an automated way to build frontend 'bridges' to the API's being defined;

Backend is meant to be an REST-like API and integrates well with Fastify and Express, but with 'adapters' you can make it talk through sockets and other transfer protocols - eg Electron app can run the 'server' in a child/worker process and IPC talk with it without having to change anything at all, yay! 
- gRPC might come next! another yay!;

Frontend is built using Svelte, seriously in love with it for now;

Desktop app is built using electron but the frontend has no attachments to the backend (abstraction layer ServerBridge can be anything) - MAYBE I shall use a webview wrapper to display it instead of a full fledged electron executable (smaller apps, yay!);

Library package contains code that might be used in both backend and frontend code;