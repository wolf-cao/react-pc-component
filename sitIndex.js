import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PageIndex from './src/docs/index'
import App from './src/docs/App'
import AutoCompletePage from './src/docs/demo/autocomplete'
import BreadcrumbsPage from './src/docs/demo/breadcrumbs'
import ButtonPage from './src/docs/demo/button'
import CheckboxPage from './src/docs/demo/checkbox'
import DatePickerPage from './src/docs/demo/datepicker'
import DialogPage from './src/docs/demo/dialog'
import DropdownPage from './src/docs/demo/dropdown'
import FormPage from './src/docs/demo/form'
import FileupPage from './src/docs/demo/fileup'
import MenuPage from './src/docs/demo/menu'
import MessagePage from './src/docs/demo/message'
import InputPage from './src/docs/demo/input'
import ImagePreviewPage from './src/docs/demo/imagepreview'
import PopoverPage from './src/docs/demo/popover'
import SpinPage from './src/docs/demo/spin'
import SwitchPage from './src/docs/demo/switch'
import SelectPage from './src/docs/demo/select'
import SearchboxPage from './src/docs/demo/searchbox'
import DropTable from './src/docs/demo/droptable'
import Pagination from './src/docs/demo/pagination'
import TablePage from './src/docs/demo/table'
import TabPage from './src/docs/demo/tab'
import TitleBarPage from './src/docs/demo/titlebar'
import TreePage from './src/docs/demo/tree'
import Badge from './src/docs/demo/badge'
import Radio from './src/docs/demo/radio'
import RichtextPage from './src/docs/demo/richtext'

import './src/docs/App.less'

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact component={PageIndex} />
      <Route path="/api" exact component={App} />
      <Route path="/api/autocomplete" exact component={AutoCompletePage} />
      <Route path="/api/breadcrumbs" exact component={BreadcrumbsPage} />
      <Route path="/api/button" exact component={ButtonPage} />
      <Route path="/api/checkbox" exact component={CheckboxPage} />
      <Route path="/api/datepicker" exact component={DatePickerPage} />
      <Route path="/api/dialog" exact component={DialogPage} />
      <Route path="/api/dropdown" exact component={DropdownPage} />
      <Route path="/api/form" exact component={FormPage} />
      <Route path="/api/fileup" exact component={FileupPage} />
      <Route path="/api/menu" exact component={MenuPage} />
      <Route path="/api/message" exact component={MessagePage} />
      <Route path="/api/input" exact component={InputPage} />
      <Route path="/api/imagepreview" exact component={ImagePreviewPage} />
      <Route path="/api/popover" exact component={PopoverPage} />
      <Route path="/api/select" exact component={SelectPage} />
      <Route path="/api/searchbox" exact component={SearchboxPage} />
      <Route path="/api/droptable" exact component={DropTable} />
      <Route path="/api/pagination" exact component={Pagination} />
      <Route path="/api/table" exact component={TablePage} />
      <Route path="/api/titlebar" exact component={TitleBarPage} />
      <Route path="/api/tabs" exact component={TabPage} />
      <Route path="/api/spin" exact component={SpinPage} />
      <Route path="/api/switch" exact component={SwitchPage} />
      <Route path="/api/tree" exact component={TreePage} />
      <Route path="/api/badge" exact component={Badge} />
      <Route path="/api/radio" exact component={Radio} />
      <Route path="/api/richtext" exact component={RichtextPage} />
    </Switch>
  </Router>,
  document.getElementById('App')
)
