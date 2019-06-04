export const imports = {
  'docs/PageView.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-page-view" */ 'docs/PageView.mdx'
    ),
  'docs/TracktorProvider.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-tracktor-provider" */ 'docs/TracktorProvider.mdx'
    ),
  'docs/UseTracktor.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-use-tracktor" */ 'docs/UseTracktor.mdx'
    ),
  'docs/index.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-index" */ 'docs/index.mdx'
    ),
  'docs/Tracktor.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-tracktor" */ 'docs/Tracktor.mdx'
    ),
}
