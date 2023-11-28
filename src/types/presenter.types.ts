export interface IPresenter<I, O> {
  present(payload: I): O;
}
