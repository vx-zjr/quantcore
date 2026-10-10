/// <reference types="vite/client" />

declare module 'virtual:content' {
  const data: import('./content/types').ContentData;
  export default data;
}
