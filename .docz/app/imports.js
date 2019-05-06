export const imports = {
  'docs/PageView.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-page-view" */ 'docs/PageView.mdx'
    ),
  'docs/Tracktor.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-tracktor" */ 'docs/Tracktor.mdx'
    ),
  'docs/TracktorProvider.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-tracktor-provider" */ 'docs/TracktorProvider.mdx'
    ),
  'docs/index.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-index" */ 'docs/index.mdx'
    ),
}
