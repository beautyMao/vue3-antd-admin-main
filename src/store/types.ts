import { IAsyncRouteState } from '@/store/modules/async-route'
import { IUserState } from '@/store/modules/user/state'
import { ITabsViewState } from '@/store/modules/tabs-view'

export interface IStore {
  asyncRoute: IAsyncRouteState
  user: IUserState
  tabsView: ITabsViewState
}
