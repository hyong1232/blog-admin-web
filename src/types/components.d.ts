declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BaseHeader: typeof import('./components/layouts/BaseHeader.vue')['default']
    BaseSide: typeof import('./components/layouts/BaseSide.vue')['default']
    HelloWorld: typeof import('./components/HelloWorld.vue')['default']
  }
  interface ComponentCustomProperties {
      $http: (request: Request) => Promise<{data: any, code: number}>
  }
}


export { }