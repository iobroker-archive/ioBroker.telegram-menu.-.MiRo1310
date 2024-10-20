import React, { Component } from "react";
import Input from "../components/btn-Input/input";
import { BtnCircleAdd } from "../components/btn-Input/btn-circle-add";
import { I18n } from "@iobroker/adapter-react-v5";
import Checkbox from "../components/btn-Input/checkbox";
import { isChecked } from "../lib/Utils.js";
import { PropsRowNavCard } from "admin/app";

class AppContentTabNavigationTableRowEditorCard extends Component<PropsRowNavCard> {
	constructor(props: PropsRowNavCard) {
		super(props);
		this.state = {};
	}

	render(): React.ReactNode {
		return (
			<div className="edit__container">
				{this.props.entries.map((entry, i) =>
					!(entry.name == "value") && !(entry.name == "text") && !entry.checkbox ? (
						<Input
							key={i}
							value={this.props.newRow[entry.name]}
							id={entry.name}
							callback={this.props.callback.onChangeInput}
							callbackValue="event.target.value"
							label={I18n.t(entry.headline)}
							class={this.props.inUse ? "inUse" : ""}
						/>
					) : entry.name == "value" || entry.name == "text" ? (
						<Input
							key={i}
							value={this.props.newRow[entry.name]}
							id={entry.name}
							callback={this.props.callback.onChangeInput}
							callbackValue="event.target.value"
							label={I18n.t(entry.headline)}
						>
							<BtnCircleAdd callback={() => this.props.openHelperText(entry.name)} />
						</Input>
					) : (
						<Checkbox
							key={i}
							id={entry.name}
							index={i}
							class="checkbox__line"
							callback={this.props.callback.onChangeCheckbox}
							isChecked={isChecked(this.props.newRow[entry.name])}
							obj={true}
							label={I18n.t(entry.headline)}
						/>
					),
				)}
			</div>
		);
	}
}

export default AppContentTabNavigationTableRowEditorCard;
