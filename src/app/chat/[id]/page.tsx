import Page from "./components/Page"

export interface IPropsChatId {
  params: {
    id: number | string
  }
}

export default ({ params: { id } }: IPropsChatId) => <Page id={id} />
