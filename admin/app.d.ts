import { GenericAppProps, GenericAppState } from "@iobroker/adapter-react-v5";
import { Tab } from '@mui/material';

export interface AdditionalPropInfo extends GenericAppProps {
	themeName: string;
}
export interface AdditionalStateInfo extends GenericAppState {
	showDropBox: boolean;
	native: Native;
	connectionReady: boolean;
	activeMenu: string;
	usedTrigger: string[];
	dropDifferenzX: number;
	dropDifferenzY: number;
	instances: string[];
	doubleTrigger: string[];
	unUsedTrigger: string[];
	triggerObject: TriggerObject;
	tab: string;
	popupMenuOpen: boolean;
	subTab: string;
	draggingRowIndex: number | null;
	showTriggerInfo: boolean;
	data: {};
	showPopupMenuList: boolean;
	dropBoxTop: number;
	dropBoxRight: number;

}

export interface PropsSettings {
	data: {
		state: {
			native: {
				instance: string;
				textNoEntry: string;
				tokenGrafana: string;
				directory: string;
				checkbox: {
					[key: string]: boolean;
				};
			};
		};

		instances: string[];
		checkbox: Object;
	};
	callback: CallbackFunctions;
}

export interface StateTabNavigation {
	rowPopup: boolean;
	rowIndex: number;
	editRow: boolean;
	valuesAreOk: boolean;
	callInUse: boolean;
	helperTextFor: string;
	editedValueFromHelperText: string | null;
	isOK: boolean;
	helperText: boolean;
	newRow: RowsNav;
	call: string;
	nav: string;
	text: string;
}
export interface PropsTabNavigation {
	data: Data;
	entries: NavEntries[];
	activeMenu: string;
	callback: Callback;
}
export interface TabValues {
	label: string;
	value: string;
	trigger: boolean;
	entries: NavEntries[];
	popupCard: any;
	searchRoot?: { root: string; type: string[] };
}
export interface NavEntries {
	name: string;
	width?: string;
	checkbox?: boolean;
	title?: string;
	editWidth?: string;
	headline: string;
	val: string;
	elementGetRows?: string;
	required?: boolean;
	btnCircleAdd?: boolean;
	search?: boolean;
	noIcon?: boolean;
	password?: boolean;
	type?: string;
}
type UpdateNative = {
	updateNative: UpdateNativeFunction;
};
export interface SetState {
	setState: SetStateFunction;
}

export interface PropsTableDndNav {
	entries: NavEntries[];
	tableData: NavData | undefined;
	card: string;
	activeMenu?: string;
	openAddRowCard: (value: any) => void;
	showButtons: ShowButtons;
	data: Data;
	setState: SetStateFunction;
	callback: CallbackFunctions;
}

interface NavData {
	[key: string]: RowsNav[];
}

export interface StateTableDndNav {
	rows: RowsNav[];
	dropStart: number;
	dropOver: number;
	dropEnd: number;
	mouseOverNoneDraggable: boolean;
}
export interface RowsNav {
	call: string;
	parse_mode: BooleanString;
	text: string;
	value: string;
}

export interface PropsTabAction {
	callback: Callback;
	activeMenu: string;
	data: Data;
}

export interface Data {
	activeMenu?: string;
	nav?: NavData;
	state: AdditionalStateInfo;
	data?: any;
	action?: any;
	socket?: any;
	themeName?: string;
	themeType?: string;
	adapterName?: string;
	unUsedTrigger?: string[];
	usersInGroup?: string[];
	userActiveCheckbox?: IsUserActiveCheckbox;
}
export interface StateTabAction {
	value: string;
}
export interface ButtonSmallProps {
	index?: number;
	callbackValue?: CallbackValue;
	callback: any;
	disabled?: string;
	class?: string;
}
export interface ButtonProps {
	color?: string;
	b_color?: string;
	padding?: string;
	small?: BooleanString;
	fontSize?: string;
	border?: string;
	width?: string;
	margin?: string;
	height?: string;
	round?: string;
	maxWidth?: string;
	verticalAlign?: string;
	secondCallback?: Function;
	index?: number | null;
	callback: Function;
	callbackValue?: CallbackValue;
	id?: string;
	setNative?: boolean;
	title?: string;
	name?: string;
	disabled?: string | boolean;
	className?: string;
	children?: ReactNode;
}
type CallbackValue = boolean | string | number | undefined;

export interface PropsCheckbox {
	id: string;
	label?: string;
	isChecked: boolean;
	callback: any;
	callbackValue?: string;
	setNative?: boolean;
	obj?: boolean;
	index?: number;
	title?: string;
	width?: string;
	marginLeft?: string;
	marginTop?: string;
	class?: string;
}
type BooleanString = "true" | "false";

export interface PropsRowNavCard {
	entries: NavEntries[];
	newRow: RowsNav;
	callback: { onchange: (data: ChangeInputNav) => void };
	inUse: boolean;
	openHelperText: (value: string) => void;
}
export interface ChangeInputNav {
	id: string;
	val: string;
}
export interface Entries {
	name: string;
	checkbox: boolean;
	editWidth: string;
	headline: string;
	width: number;
	val: string;
	title: string;
}
export interface SelectProps {
	id: string;
	name?: string;
	label?: string;
	placeholder?: string;
	options: string[];
	selected: string;
	callback: SetStateFunction;
	setNative?: boolean;
	width?: string;
	callbackValue?: CallbackValue;
}
type UpdateNativeFunction = (key: string, value?: any, cb?: () => void) => void;
export interface InputProps {
	id: string;
	type?: string;
	placeholder?: string;
	value: string;
	callback: SetStateFunction;
	label?: string;
	setNative?: boolean;
	spellCheck?: boolean;
	width?: string | number;
	inputWidth?: string;
	margin?: string;
	class?: string;
	children?: ReactNode;
	function?: string;
	index?: number;
	disabled?: boolean;
	onMouseOver?: (e: any, setState: any) => void;
	onMouseLeave?: (e: any, setState: any) => void;
	setState?: SetStateFunction;
	callbackValue?: CallbackValue;
	className?: string;
}
export interface PropsHeaderIconBar {
	instance: number;
	common: Record<string, any>;
	native: any;
	onLoad: (error: Record<string, null>) => void;
	onError: (text: any) => void;
	adapterName: string;
	changed: boolean;
	onChange: UpdateNativeFunction;
}
export interface PropsHelperCard {
	helper: {};
	val: string;
	editedValueFromHelperText: string;
	setState: SetStateFunction;
	data: any;
	callback: any;
	name: string;
	text: string;
	helperTextForInput: string;
}
export interface StateHelperCard {
	rows: any;
	showSelectId: boolean;
	selectedId: string;
}
type SetStateFunction = React.Component["setState"];
export interface PropsTextarea {
	id: string;
	value: string;
	callback: any;
	placeholder?: string;
	class?: string;
	width?: string;
	inputWidth?: string;
	margin?: string;
	label: string;
	children?: ReactNode;
	function?: string;
	setNative?: boolean;
	spellCheck?: boolean;
	onMouseOver?: (e: any, setState: any) => void;
	onMouseLeave?: (e: any, setState: any) => void;
	setState?: SetStateFunction;
	rows?: number;
	cols?: number;
	index?: number;
	callbackValue?: CallbackValue;
}
export interface StateTextarea {
	value: string;
}
export interface PropsActionCard {
	data: any;
	activeMenu: string;
	card: string;
	subCard: string;
	entries: any;
	popupCard: any;
	titlePopup: string;
	showButtons: any;
	callback: any;
	searchRoot: any;
}
export interface StateActionCard {
	rowPopup: boolean;
	rowIndex: number;
	editRow: boolean;
	newRow: any;
	rowsLength: number;
	newUnUsedTrigger: any;
	helperText: boolean;
	helperTextFor: string;
	editedValueFromHelperText: any;
	isOK: boolean;
	valueForSave: any;
	inputValuesAreOK: boolean;
	disableInput: boolean;
	nav: string;
	text: string;
	helperTextForInput: string;
}
export interface PropsTableDndAction {
	tableData: any;
	activeMenu: string;
	subCard: string;
	entries: any;
	data: any;
	setState: SetStateFunction;
	showButtons: ShowButtons;
	openAddRowCard: any;
	callback: any;
	addEditedTrigger: any;
	card: string;
}
export interface StateTableDndAction {
	dropStart: number;
	dropEnd: number;
	dropOver: number;
	rows: any;
	mouseOverNoneDraggable: boolean;
}
export interface PropsSubTable {
	data: [];
	name: string;
	entry: any;
	setState: SetStateFunction;
}
export interface PropsTelegramUserCard {
	name: string;
	chatID: string;
	data: any;
	callback: any;
	setState: SetStateFunction;
	class?: string;
	key?: number;
}
export interface StateTelegramUserCard {
	usersInGroup: any;
	name: string;
	activeMenu: string;
}
export interface PropsPopupContainer {
	title: string;
	isOK?: boolean;
	closeBtn?: boolean;
	width?: string;
	call?: string;
	nav?: string;
	text?: string;
	usedTrigger?: string[];
	height?: string;
	class?: string;
	drag?: string;
	top?: string;
	reference?: any;
	onDragStart?: any;
	onDragEnd?: any;
	onDragOver?: any;
	onDrop?: any;
	onDrag?: any;
	onMouseEnter?: any;
	onMouseLeave?: any;
	callback: any;
	value?: string;
	setState?: SetStateFunction;
	data?: { [key: string]: any };
	children?: ReactNode;
}
export interface StatePopupContainer {
	menuName: string;
	disable: boolean;
	inUse: boolean;
}
export interface PropsRowEditPopupCard {
	entries: any;
	newRow: ActionNewRowProps;
	data: any;
	openHelperText: any;
	subCard: any;
	searchRoot: any;
	buttons: any;
	newUnUsedTrigger: any;
	callback?: { setState: SetStateFunction };
}

export type BooleanString = "true" | "false";

export interface ActionNewRowProps {
	IDs: string[];
	ack: BooleanString[];
	confirm: BooleanString[];
	parse_mode: BooleanString[];
	returnText: string[];
	values: string[];
	trigger: string[];
	switch_checkbox: BooleanString[];

}
export interface StateRowEditPopupCard {
	rows: RowsSetState[];
	trigger: string;
	data: any;
	showSelectId: boolean;
	selectIdValue: string;
	indexID: number;
	dropStart: number;
	dropEnd: number;
	dropOver: number;
	mouseOverNoneDraggable: boolean;
	itemForID: string;
}
export interface RowsSetState {
	IDs: string;
	ack: ActionNewRowProps;
	confirm: BooleanString;
	parse_mode: BooleanString;
	returnText: string;
	values: string;
	trigger: string;
	switch_checkbox: BooleanString;
}

export interface AppState {
	selectedTab: any;
	selectedTabNum: number;
	native: {};
	errorText: string;
	changed: boolean;
	connected: boolean;
	loaded: boolean;
	isConfigurationError: string;
	expertMode: boolean;
	toast: string;
	theme: import("./types").Theme;
	themeName: string;
	themeType: string;
	bottomButtons: boolean;
	width: import("./types").Width;
	confirmClose: boolean;
	_alert: boolean;
	_alertType: string;
	_alertMessage: string;
	showDropBox: boolean;
}

export interface TriggerObject {
	unUsedTrigger: string[];
	everyTrigger: {};
	usedTrigger: {
		nav: {};
		action: {};
	};
}

export interface PropsDropBox {
	native: Native;
	callback: any;
	tab: string;
	subTab: string;
	index: number | null;
	activeMenu: string;
}
export interface StateDropBox {
	inDropBox: boolean;
	menuList: string[];
	selectedMenu: string;
	selectedValue: string;
	openRenamePopup: boolean;
	trigger: string;
	newTrigger: string;
	usedTrigger: string[];
	rowToWorkWith: any;
	isOK: boolean;
	oldTrigger: string;
}
export interface PropsRenameCard {
	data: any;
	id?: string;
	callback: any;
	value?: string;
}

export interface StateRenameCard { }
export interface PropsTriggerOverview {
	data: any;
	usersInGroup: any;
	userActiveCheckbox: any;
}
export interface StateTriggerOverview {
	ulPadding: any;
	trigger: any;
	groupsOfMenus: any;
	selected: string;
	options: any;
}
export interface MenuWithUser {
	menu: string;
	index: number;
}

export interface PropsSquare {
	color: string;
	trigger?: string;
	position: number;
	noText?: boolean;
}
export interface StateSquare {
	bColor: string;
	width: number;
	color: string;
	text: string;
	left: string;
	fontWeight: string;
}
export interface PropsHeaderTelegramUsers {
	callback: any;
	data: any;
	menuPopupOpen: boolean;
}
export interface StateHeaderTelegramUsers {
	menuOpen: boolean;
	errorUserChecked: boolean;
	menuChecked: boolean;
}
export interface PropsHeaderMenu {
	data: any;
	callback: any;
}
export interface PropsBtnCard {
	callback: any;
	data: any;
}
export interface StateBtnCard {
	oldMenuName: string;
	newMenuName: string;
	renamedMenuName: string;
	confirmDialog: boolean;
	renameDialog: boolean;
	menuNameExists: boolean;
	isOK: boolean;
}
export interface PropsMenuPopupCard {
	usersInGroup: any;
	callback: any;
}
export interface PropsMenuButton {
	b_color?: string;
	color?: string;
	title?: string;
	onChangeValue?: () => void;
	children?: ReactNode;
}

export interface Native {
	dropbox: {
		dropboxTop: number;
		dropboxRight: number;
	};
	data: DataObject;
	usersInGroup: string[];
	nav: any;
	instance: string;
	data: NativeData;
	checkbox: {
		sendMenuAfterRestart: boolean;
		checkboxNoValueFound: boolean;
		resKey: boolean;
		oneTiKey: boolean;
	};
	usersForGlobal: string;
	users: never[];
	startsides: never[];
	tokenGrafana: string;
	directory: string;
	userActiveCheckbox: {};
	usersInGroup: {};
	textNoEntry: string;
	userListWithChatID: never[];
}
export interface NativeData {
	action: { [key: string]: Actions };
	nav: { [key: string]: RowsNav };
}
export interface Actions {
	get: Get[];
	set: Set[];
	pic: Pic[];
	httpRequest: HttpRequest[];
	echarts: Echart[];
	events: Events[];
}
export interface HttpRequest {
	url: string[];
	user: string[];
	password: string[];
	filename: string[];
	trigger: string[];
	delay: string[];
}
export interface Set {
	ack: BooleanString[];
	confirm: BooleanString[];
	parse_mode: BooleanString[];
	switch_checkbox: BooleanString[];
	IDs: string[];
	returnText: string[];
	trigger: string[];
	values: string[];
}
export interface Get {
	newline_checkbox: BooleanString[];
	parse_mode: BooleanString[];
	IDs: string[];
	text: string[];
	trigger: string[];
}
export interface Events {
	ack: BooleanString[];
	ID: string[];
	menu: string[];
	condition: string;
}
export interface Pic {
	IDs: string[];
	filename: string[];
	trigger: string[];
	picSendDelay: string[];
}
export interface Echart {
	background: string[];
	echartsInstance: string[];
	filename: string[];
	preset: string;
	theme: string[];
	trigger: string[];
}
export interface PropsMainTabList {
	callback: CallbackFunctions;
}
export interface PropsMainActions {
	data: any;
	tab: string;
	callback: CallbackFunctions;
}
export interface CallbackFunctions {
	setState: SetStateFunction;
	updateNative: UpdateNativeFunction;
}
export interface PropsMainTriggerOverview {
	state: AdditionalStateInfo;
	callback: CallbackFunctions;
}
export interface PropsMainDoubleTriggerInfo {
	state: AdditionalStateInfo;
}
export interface PropsMainContent {
	state: AdditionalStateInfo;
	socket: any;
	data: any;
	callback: CallbackFunctions;
	adapterName: string;
}
export interface PropsMainDropBox {
	state: AdditionalStateInfo;
	callback: CallbackFunctions;
	dropBoxRef: any;
}
export interface PropsTableNavHeader {
	entries: NavEntries[];
}

export interface PropsTableNavHelper {
	state: any;
	setState: SetStateFunction;
	data: any;
	popupHelperCard: any;
}
export interface PropsActionEditHeader {
	entries: NavEntries[];
	buttons: {
		add: boolean;
		remove: boolean;
	};
}
export interface PropsButtonCard {
	showButtons: ShowButtons;
	openAddRowCard: (index: number) => void;
	editRow: (index: number) => void;
	moveUp: (index: number) => void;
	moveDown: (index: number) => void;
	deleteRow: (index: number) => void;
	index: number;
	rows: any[];
	notShowDelete?: boolean;
}
export interface ShowButtons {
	add: boolean;
	edit: boolean;
	moveUp?: boolean;
	moveDown?: boolean;
	remove: boolean;
}
export interface TabListingType {
	label: string;
	value: string;
}