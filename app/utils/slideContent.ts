import { marked } from 'marked'

marked.setOptions({
  breaks: true,
})

const markdownModules = import.meta.glob<string>('../../content/slides/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

function slugFromPath(path: string) {
  return path.match(/([^/]+)\.md$/)?.[1] ?? ''
}

const slideContentHtml = Object.fromEntries(
  Object.entries(markdownModules).map(([path, markdown]) => [
    slugFromPath(path),
    marked.parse(markdown) as string,
  ]),
)

export function getSlideContentHtml(slug: string) {
  return slideContentHtml[slug] ?? ''
}
