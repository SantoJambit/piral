import { History } from 'history';
import { ComponentType, ReactChild } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ArbiterModuleMetadata } from 'react-arbiter';
import { Atom } from '@dbeining/react-atom';
import { LayoutType, LayoutBreakpoints } from './layout';
import { UserInfo, UserFeatures, UserPermissions } from './user';
import { ConnectorDetails } from './feed';
import { TilePreferences } from './tile';
import { MenuSettings } from './menu';
import { SearchHandler } from './search';
import { SharedDataItem, DataStoreTarget } from './data';
import { NotificationOptions } from './notifications';
import { Dict, Without } from './common';
import { Disposable } from './utils';
import { StateDispatcher } from './container';
import {
  TileComponentProps,
  BaseComponentProps,
  ExtensionComponentProps,
  MenuComponentProps,
  ModalComponentProps,
  PageComponentProps,
  ErrorInfoProps,
  DashboardProps,
  LoaderProps,
} from './components';

export type WrappedComponent<TProps> = ComponentType<Without<TProps, keyof BaseComponentProps<{}>>>;

export interface OpenNotification {
  id: string;
  content: ReactChild;
  options: NotificationOptions;
  close(): void;
}

export interface OpenModalDialog {
  name: string;
  options: any;
  close(): void;
}

export interface TileRegistration {
  component: WrappedComponent<TileComponentProps<any>>;
  preferences: TilePreferences;
}

export interface PageRegistration {
  component: WrappedComponent<PageComponentProps<any>>;
}

export interface ModalRegistration {
  component: WrappedComponent<ModalComponentProps<any, any>>;
  defaults: any;
}

export interface MenuItemRegistration {
  component: WrappedComponent<MenuComponentProps<any>>;
  settings: MenuSettings;
}

export interface ExtensionRegistration {
  component: WrappedComponent<ExtensionComponentProps<any>>;
  reference: any;
  defaults: any;
}

export interface SearchProviderRegistration {
  search: SearchHandler;
  cancel(): void;
  clear(): void;
  onlyImmediate: boolean;
}

export interface GlobalStateOptions<TUser = {}> extends Partial<AppComponents> {
  /**
   * Sets the available languages.
   * By default, only the default language is used.
   */
  languages?: Array<string>;
  /**
   * Sets the default language.
   * By default, English is used.
   * @default 'en'
   */
  language?: string;
  /**
   * Sets the additional / initial routes to register.
   */
  routes?: Record<string, ComponentType<RouteComponentProps>>;
  /**
   * Sets the available trackers to register.
   */
  trackers?: Array<ComponentType<RouteComponentProps>>;
  /**
   * Sets the available layout breakpoints.
   */
  breakpoints?: LayoutBreakpoints;
  /**
   * Sets the initially available user information.
   */
  user?: UserState<TUser>;
  /**
   * Sets the history to use for the router.
   */
  history?: History;
}

export interface AppComponents {
  /**
   * The home page renderer.
   */
  Dashboard: ComponentType<DashboardProps>;
  /**
   * The progress indicator renderer.
   */
  Loader: ComponentType<LoaderProps>;
  /**
   * The error renderer.
   */
  ErrorInfo: ComponentType<ErrorInfoProps>;
  /**
   * The history management instance.
   */
  history: History;
}

export interface AppState {
  /**
   * Information for the layout computation.
   */
  layout: {
    /**
     * The currently active layout.
     */
    current: LayoutType;
    /**
     * The different layout breakpoints.
     */
    breakpoints: LayoutBreakpoints;
  };
  /**
   * Information for the language display.
   */
  language: {
    /**
     * The selected, i.e., active, language.
     */
    selected: string;
    /**
     * The available languages.
     */
    available: Array<string>;
  };
  /**
   * Gets if the application is currently performing a background loading
   * activity, e.g., for loading modules asynchronously or fetching
   * translations.
   */
  loading: boolean;
  /**
   * Components relevant for rendering parts of the app.
   */
  components: AppComponents;
  /**
   * The application's shared data.
   */
  data: Dict<SharedDataItem>;
  /**
   * The currently open notifications.
   */
  notifications: Array<OpenNotification>;
  /**
   * The currently open modal dialogs.
   */
  modals: Array<OpenModalDialog>;
  /**
   * The used (exact) application routes.
   */
  routes: Dict<ComponentType<RouteComponentProps>>;
  /**
   * The used application trackers.
   */
  trackers: Array<ComponentType<RouteComponentProps>>;
}

export interface ComponentsState {
  /**
   * The registered tile components for a dashboard.
   */
  tiles: Dict<TileRegistration>;
  /**
   * The registered page components for the router.
   */
  pages: Dict<PageRegistration>;
  /**
   * The registered modal dialog components.
   */
  modals: Dict<ModalRegistration>;
  /**
   * The registered menu items for global display.
   */
  menuItems: Dict<MenuItemRegistration>;
  /**
   * The registered extension components for extension slots.
   */
  extensions: Dict<Array<ExtensionRegistration>>;
  /**
   * The registered search providers for context aware search.
   */
  searchProviders: Dict<SearchProviderRegistration>;
}

export interface FeedDataState {
  /**
   * Determines if the feed data is currently loading.
   */
  loading: boolean;
  /**
   * Indicates if the feed data was already loaded and is active.
   */
  loaded: boolean;
  /**
   * Stores the potential error when initializing or loading the feed.
   */
  error: any;
  /**
   * The currently stored feed data.
   */
  data: any;
}

export interface FeedsState {
  /**
   * Gets the state of the available data feeds.
   */
  [id: string]: FeedDataState;
}

export interface FormDataState {
  /**
   * Gets the usage status of the form - true means
   * the form is actively being used, false is the
   * status for forms that are not used any more.
   */
  active: boolean;
  /**
   * Indicates that the form is currently submitting.
   */
  submitting: boolean;
  /**
   * Stores the potential error of the form.
   */
  error: any;
  /**
   * The initial data to use.
   */
  initialData: any;
  /**
   * The current data that has been submitted.
   */
  currentData: any;
  /**
   * Gets or sets if th current data is different from
   * the initial data.
   */
  changed: boolean;
}

export interface FormsState {
  /**
   * Gets the state of forms that are currently not actively used.
   */
  [id: string]: FormDataState;
}

export interface UserState<T = {}> {
  /**
   * The provided features, if any.
   */
  features: UserFeatures;
  /**
   * The given permissions, if any.
   */
  permissions: UserPermissions;
  /**
   * The current user, if available.
   */
  current: UserInfo<T> | undefined;
}

export interface SearchState {
  /**
   * Gets the current input value.
   */
  input: string;
  /**
   * Gets weather the search is still loading.
   */
  loading: boolean;
  /**
   * The results to display for the current search.
   */
  results: Array<ReactChild>;
}

export interface GlobalState<TUser = {}> {
  /**
   * The relevant state for the app itself.
   */
  app: AppState;
  /**
   * The relevant state for the registered components.
   */
  components: ComponentsState;
  /**
   * The relevant state for the registered feeds.
   */
  feeds: FeedsState;
  /**
   * The relevant state for the registered containers.
   */
  containers: Record<string, any>;
  /**
   * The relevant state for the active forms.
   */
  forms: FormsState;
  /**
   * The relevant state for the current user.
   */
  user: UserState<TUser>;
  /**
   * The relevant state for the in-site search.
   */
  search: SearchState;
  /**
   * Gets the loaded modules.
   */
  modules: Array<ArbiterModuleMetadata>;
}

export interface StateActions {
  /**
   * Sets the currently logged in user.
   * @param user The current user or undefined is anonymous.
   * @param features The features for the current user, if any.
   * @param permissions The permissions of the current user, if any.
   */
  setUser<T>(user: UserInfo<T>, features: UserFeatures, permissions: UserPermissions): void;
  /**
   * Reads the value of a shared data item.
   * @param name The name of the shared item.
   */
  readDataValue(name: string): any;
  /**
   * Tries to write a shared data item. The write access is only
   * possible if the name belongs to the provided owner or has not
   * been taken yet.
   * Setting the value to null will release it.
   * @param name The name of the shared data item.
   * @param value The value of the shared data item.
   * @param owner The owner of the shared data item.
   * @param target The target storage locatation.
   * @param expiration The time for when to dispose the shared item.
   */
  tryWriteDataItem(name: string, value: any, owner: string, target: DataStoreTarget, expiration: number): boolean;
  /**
   * Performs a layout change.
   * @param current The layout to take.
   */
  changeLayout(current: LayoutType): void;
  /**
   * Changes the selected language.
   * @param selected The selected language.
   */
  selectLanguage(selected: string): void;
  /**
   * Creates a new local state.
   * @param id The id of the state.
   * @param state The initial state to use.
   */
  createState<TState>(id: string, state: TState): void;
  /**
   * Destroys an existing local state.
   * @param id The id of the state.
   */
  destroyState(id: string): void;
  /**
   * Replaces the local state with the provided state.
   * @param id The id of the local state.
   * @param state The new state to use.
   */
  replaceState<TState>(id: string, reducer: StateDispatcher<TState>): void;
  /**
   * Creates a new (empty) feed.
   * @param id The id of the feed.
   */
  createFeed(id: string): void;
  /**
   * Destroys an existing feed.
   * @param id The id of the feed.
   */
  destroyFeed(id: string): void;
  /**
   * Loads the feed via the provided details.
   * @param feed The feed details to use for loading.
   */
  loadFeed<TData, TItem>(feed: ConnectorDetails<TData, TItem>): void;
  /**
   * Opens the given notification.
   * @param notification The notification to show.
   */
  openNotification(notification: OpenNotification): void;
  /**
   * Closes the given notification.
   * @param notification The notification to hide.
   */
  closeNotification(notification: OpenNotification): void;
  /**
   * Opens the provided dialog.
   * @param dialog The dialog to show.
   */
  openModal(dialog: OpenModalDialog): void;
  /**
   * Closes the provided dialog.
   * @param dialog The dialog to hide.
   */
  closeModal(dialog: OpenModalDialog): void;
  /**
   * Registers a new route to be resolved.
   * @param route The route to register.
   * @param value The page to be rendered on the route.
   */
  registerPage(route: string, value: PageRegistration): void;
  /**
   * Unregisters an existing route.
   * @param route The route to be removed.
   */
  unregisterPage(route: string): void;
  /**
   * Registers a new tile.
   * @param name The name of the tile.
   * @param value The tile registration.
   */
  registerTile(name: string, value: TileRegistration): void;
  /**
   * Unregisters an existing tile.
   * @param name The name of the tile to be removed.
   */
  unregisterTile(name: string): void;
  /**
   * Registers a new extension.
   * @param name The name of the extension category.
   * @param value The extension registration.
   */
  registerExtension(name: string, value: ExtensionRegistration): void;
  /**
   * Unregisters an existing extension.
   * @param name The name of the extension category.
   * @param value The extension that will be removed.
   */
  unregisterExtension(name: string, reference: any): void;
  /**
   * Registers a new menu item.
   * @param name The name of the menu item.
   * @param value The menu registration.
   */
  registerMenuItem(name: string, value: MenuItemRegistration): void;
  /**
   * Unregisters an existing menu item.
   * @param name The name of the menu item to be removed.
   */
  unregisterMenuItem(name: string): void;
  /**
   * Registers a new modal dialog.
   * @param name The name of the modal.
   * @param value The modal registration.
   */
  registerModal(name: string, value: ModalRegistration): void;
  /**
   * Unregisters an existing modal dialog.
   * @param name The name of the modal to be removed.
   */
  unregisterModal(name: string): void;
  /**
   * Registers a new search provider.
   * @param name The name of the search provider.
   * @param value The value representing the provider.
   */
  registerSearchProvider(name: string, value: SearchProviderRegistration): void;
  /**
   * Unregisters an existing search provider.
   * @param name The name of the search provider.
   */
  unregisterSearchProvider(name: string): void;
  /**
   * Sets the current search input.
   * @param input The input to set.
   */
  setSearchInput(input: string): void;
  /**
   * Sets the form data from the provided original state and patch data.
   * @param id The id of the form.
   * @param original The initial state of the form.
   * @param patch The provided patch.
   */
  updateFormState(id: string, original: FormDataState, patch: Partial<FormDataState>): void;
  /**
   * Resets the search results.
   * @param input The input to set.
   * @param loading Determines if further results are currently loading.
   */
  resetSearchResults(input: string, loading: boolean): void;
  /**
   * Appends more results to the existing results.
   * @param items The items to append.
   * @param done Determines if more results are pending.
   */
  appendSearchResults(items: Array<ReactChild>, done: boolean): void;
  /**
   * Prepends more results to the existing results.
   * @param items The items to prepend.
   * @param done Determines if more results are pending.
   */
  prependSearchResults(items: Array<ReactChild>, done: boolean): void;
  /**
   * Triggers the search explicitly.
   * @param input Optionally sets the query to look for. Otherwise the current input is taken.
   * @param immediate Optionally, determins if the search was invoked immediately.
   */
  triggerSearch(input?: string, immediate?: boolean): Disposable;
  /**
   * Sets the loading state of the application, which can be helpful for indicating loading of
   * required data.
   * @param loading The current loading state.
   */
  setLoading(loading: boolean): void;
}

export type GlobalStateContext<TActions extends {} = {}> = StateActions &
  TActions & {
    /**
     * The global state context atom.
     */
    state: Atom<GlobalState>;
  };
