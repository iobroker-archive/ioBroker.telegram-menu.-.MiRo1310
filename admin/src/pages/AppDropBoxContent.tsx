import React, { Component } from "react";
import Select from "../components/btn-Input/select";
import { Radio } from "@mui/material";
import { I18n } from "@iobroker/adapter-react-v5";
import { updateTriggerForSelect } from "../lib/actionUtils.js";
import { deepCopy } from "../lib/Utils.js";
import PopupContainer from "../components/popupCards/PopupContainer";
import RenameCard from "../components/popupCards/RenameCard";
import { PropsDropBox, StateDropBox } from "admin/app";

class DropBox extends Component<PropsDropBox, StateDropBox> {
	constructor(props) {
		super(props);
		this.state = {
			inDropBox: false,
			menuList: [],
			selectedMenu: "",
			selectedValue: "move",
			openRenamePopup: false,
			trigger: "",
			newTrigger: "",
			usedTrigger: [],
			rowToWorkWith: {},
			isOK: false,
			oldTrigger: "",
		};
	}
	componentDidMount() {
		this.updateMenuList();
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.activeMenu !== this.props.activeMenu) {
			this.setState({ selectedMenu: "" });
			this.updateMenuList();
		}
		if (prevState.newTrigger !== this.state.newTrigger) {
			if (this.state.usedTrigger) {
				if (
					this.state.usedTrigger.includes(this.state.newTrigger) ||
					this.state.newTrigger === "" ||
					this.state.newTrigger === this.state.oldTrigger
				) {
					this.setState({ isOK: false });
				} else {
					this.setState({ isOK: true });
				}
			} else {
				this.setState({ isOK: true });
			}
		}
	}
	updateMenuList = () => {
		const menuList = Object.keys(this.props.native.usersInGroup);
		this.setState({ menuList: menuList });
	};

	handleDragOver = (e) => {
		e.preventDefault();
	};

	handleOnDrop = () => {
		if (this.state.selectedMenu === "") {
			return;
		}
		const data = deepCopy(this.props.native.data);
		let rowToWorkWith;
		const moveOrCopy = this.state.selectedValue;

		if (this.state.newTrigger === "" && !(this.props.subTab === "events")) {
			if (this.props.tab === "action") {
				rowToWorkWith = this.props.native.data[this.props.tab][this.props.activeMenu][this.props.subTab][this.props.index];
			} else {
				rowToWorkWith = this.props.native.data[this.props.tab][this.props.activeMenu][this.props.index];
			}
			this.setState({ rowToWorkWith: rowToWorkWith });
			const usedTrigger = updateTriggerForSelect(data, this.props.native?.usersInGroup, this.state.selectedMenu)?.usedTrigger;

			this.setState({ usedTrigger: usedTrigger || [] });
			if (this.props.tab === "action") {
				if (moveOrCopy === "copy") {
					if (rowToWorkWith.trigger && usedTrigger?.includes(rowToWorkWith.trigger[0])) {
						this.setState({
							trigger: rowToWorkWith.trigger,
							newTrigger: rowToWorkWith.trigger,
							openRenamePopup: true,
							oldTrigger: rowToWorkWith.trigger,
						});
					}
				} else {
					// Move Item
					if (this.countItemsInArray(usedTrigger, rowToWorkWith.trigger[0]) <= 1) {
						this.setState({ trigger: rowToWorkWith.trigger, newTrigger: rowToWorkWith.trigger });
						this.move(rowToWorkWith, data);
					} else {
						this.setState({
							trigger: rowToWorkWith.trigger,
							newTrigger: rowToWorkWith.trigger,
							openRenamePopup: true,
							oldTrigger: rowToWorkWith.trigger,
						});
					}
				}
			} else {
				// Navigation
				if (moveOrCopy === "copy") {
					if (usedTrigger?.includes(rowToWorkWith.call)) {
						this.setState({
							trigger: rowToWorkWith.call,
							newTrigger: rowToWorkWith.call,
							openRenamePopup: true,
							oldTrigger: rowToWorkWith.call,
						});
					}
				} else {
					// Move Item
					if (this.countItemsInArray(usedTrigger, rowToWorkWith.call) <= 1) {
						this.setState({ trigger: rowToWorkWith.call, newTrigger: rowToWorkWith.call });
						this.move(rowToWorkWith, data);
					} else {
						this.setState({
							trigger: rowToWorkWith.call,
							newTrigger: rowToWorkWith.call,
							openRenamePopup: true,
							oldTrigger: rowToWorkWith.call,
						});
					}
				}
			}
		} else {
			if (this.props.subTab === "events") {
				rowToWorkWith = this.props.native.data[this.props.tab][this.props.activeMenu][this.props.subTab][this.props.index];
			} else if (!rowToWorkWith) {
				rowToWorkWith = this.state.rowToWorkWith;
			}

			if (moveOrCopy === "copy") {
				this.copy(rowToWorkWith, data);
			} else {
				this.move(rowToWorkWith, data);
			}
		}
	};
	countItemsInArray = (data, searchedString) => {
		let count = 0;
		data.forEach((element) => {
			if (element.trim() === searchedString.trim()) {
				count++;
			}
		});

		return count;
	};
	move = (rowToWorkWith, data) => {
		if (this.props.tab === "action" && this.props.subTab !== "events") {
			if (this.state.newTrigger !== "") {
				rowToWorkWith.trigger[0] = this.state.newTrigger;
			}

			// Wenn es das erste Element ist, dann muss das Array erstellt werden
			if (!data[this.props.tab][this.state.selectedMenu][this.props.subTab]) {
				data[this.props.tab][this.state.selectedMenu][this.props.subTab] = [];
			}

			data[this.props.tab][this.state.selectedMenu][this.props.subTab].push(rowToWorkWith);
			data[this.props.tab][this.props.activeMenu][this.props.subTab].splice(this.props.index, 1);
		} else if (this.props.subTab == "events") {
			// Events besonders da kein Trigger vorhanden ist
			if (!data[this.props.tab][this.state.selectedMenu][this.props.subTab]) {
				data[this.props.tab][this.state.selectedMenu][this.props.subTab] = [];
			}
			data[this.props.tab][this.state.selectedMenu][this.props.subTab].push(rowToWorkWith);
			data[this.props.tab][this.props.activeMenu][this.props.subTab].splice(this.props.index, 1);
		} else {
			if (this.state.newTrigger !== "") {
				rowToWorkWith.call = this.state.newTrigger;
			}
			data[this.props.tab][this.state.selectedMenu].push(rowToWorkWith);
			data[this.props.tab][this.props.activeMenu].splice(this.props.index, 1);
		}
		this.props.callback.updateNative("data", data);
		this.setState({ newTrigger: "" });
	};
	copy = (rowToWorkWith, data) => {
		if (this.props.tab === "action" && this.props.subTab !== "events") {
			rowToWorkWith.trigger[0] = this.state.newTrigger;
			data[this.props.tab][this.state.selectedMenu][this.props.subTab].push(rowToWorkWith);
		} else if (this.props.subTab == "events") {
			data[this.props.tab][this.state.selectedMenu][this.props.subTab].push(rowToWorkWith);
		} else {
			rowToWorkWith.call = this.state.newTrigger;
			data[this.props.tab][this.state.selectedMenu].push(rowToWorkWith);
		}
		this.props.callback.updateNative("data", data);
		this.setState({ newTrigger: "" });
	};

	handleDrag = (val) => {
		this.setState({ inDropBox: val });
	};
	handleChange = (event) => {
		this.setState({ selectedValue: event.target.value });
	};
	renameMenu = (value) => {
		if (!value) {
			this.setState({ openRenamePopup: false });
			this.setState({ newTrigger: "" });
			return;
		}
		if (value === true) {
			this.setState({ openRenamePopup: false });
			this.handleOnDrop();

			return;
		}
		this.setState({ newTrigger: value });
	};
	render() {
		return (
			<div className="Dropbox--outerContainer">
				<div className="DropBox-Container">
					<p>{this.state.isOK}</p>
					<Select
						options={this.state.menuList}
						selected={this.state.selectedMenu}
						id="selectedMenu"
						callback={this.setState.bind(this)}
						placeholder={I18n.t("Select a target menu")}
					></Select>
					<label>
						<Radio
							checked={this.state.selectedValue === "move"}
							onChange={this.handleChange}
							value="move"
							name="radio-buttons"
							inputProps={{ "aria-label": "A" }}
						/>
						{I18n.t("Move")}
					</label>
					<label>
						<Radio
							checked={this.state.selectedValue === "copy"}
							onChange={this.handleChange}
							value="copy"
							name="radio-buttons"
							inputProps={{ "aria-label": "B" }}
						/>
						{I18n.t("Copy")}
					</label>
					<div
						className="DropBox"
						draggable
						onDrop={() => this.handleOnDrop()}
						onDragOver={(event) => this.handleDragOver(event)}
						onDragEnter={() => this.handleDrag(true)}
						onDragLeave={() => this.handleDrag(false)}
					>
						<p className="DropBox-Header">Drop here!!!</p>
						<p className="DropBox-Content">
							{I18n.t("Select a Menu,select move or copy. Watch out! A user must be active in the selected menu!")}{" "}
						</p>
					</div>
				</div>
				{this.state.openRenamePopup ? (
					<div className="Dropbox--PopupContainer-RenameCard">
						<PopupContainer
							title={I18n.t("Rename trigger")}
							value={this.state.trigger}
							callback={this.renameMenu}
							data={{ newMenuName: this.state.newTrigger }}
							class="DropBox-Background"
							isOK={this.state.isOK}
						>
							<RenameCard
								callback={{ setState: this.setState.bind(this), renameMenu: this.renameMenu }}
								id="newTrigger"
								data={{ newMenuName: this.state.newTrigger }}
							></RenameCard>
						</PopupContainer>
					</div>
				) : null}
			</div>
		);
	}
}

export default DropBox;
