import IconSpinner from "@/components/icons/IconSpinner"

const LoadingArticle = () => (
  <article className="w-full h-full flex items-center justify-center">
    <div className="my-5 [&>svg>g>path]:fill-element-accent-1 flex items-center justify-center w-6 h-6">
      <IconSpinner />
    </div>
  </article>
)

LoadingArticle.displayName = "LoadingArticle"
export default LoadingArticle
