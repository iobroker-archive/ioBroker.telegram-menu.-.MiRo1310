import React, { Component } from "react";
import Input from "@components/btn-Input/input";
import { Grid } from "@mui/material";
import Checkbox from "@components/btn-Input/checkbox";
import { I18n } from "@iobroker/adapter-react-v5";
import Select from "@components/btn-Input/select";
import { PropsSettings } from "admin/app";
import { EventSelect } from "@components/btn-Input/select";
import { EventInput } from "@/types/event";
import { EventCheckbox } from "../types/event";

class Settings extends Component<PropsSettings> {
	constructor(props: PropsSettings) {
		super(props);
		this.state = {
			value: "/opt/iobroker/grafana/",
			options: ["One", "Two", "Three"],
		};
	}
	onClickCheckbox = ({ isChecked, id }: EventCheckbox): void => {
		const checkbox = { ...this.props.data.state.native.checkbox };
		checkbox[id] = isChecked;
		this.props.callback.updateNative("checkbox", checkbox);
	};

	componentDidMount(): void {
		if (!this.props.data.state.native.checkbox.sendMenuAfterRestart) {
			const checkbox = { ...this.props.data.state.native.checkbox };
			checkbox.sendMenuAfterRestart = true;
			this.props.callback.updateNative("checkbox", checkbox);
		}
	}

	render(): React.ReactNode {
		return (
			<div className="Settings">
				<h1>{I18n.t("settings")}</h1>
				<Grid container spacing={1}>
					<Grid item sm={12}>
						<Select
							placeholder="placeholderInstance"
							options={this.props.data.state.instances}
							label={I18n.t("telegramInstance")}
							name="instance"
							selected={this.props.data.state.native.instance}
							id="instance"
							callback={({ id, val }: EventSelect) => this.props.callback.updateNative(id, val)}
							setNative={true}
						/>
					</Grid>
					<Grid item xs={12} sm={12} lg={4}>
						<Input
							label={I18n.t("textNoEntry")}
							placeholder="No entry found"
							callback={({ id, val }: EventInput) => this.props.callback.updateNative(id, val)}
							id="textNoEntry"
							value={this.props.data.state.native.textNoEntry || I18n.t("entryNotFound")}
						/>
					</Grid>
					<Grid item xs={12} sm={12} lg={4}>
						<Input
							label={I18n.t("Token Grafana")}
							placeholder="Token Grafana"
							callback={({ id, val }: EventInput) => this.props.callback.updateNative(id, val)}
							id="tokenGrafana"
							value={this.props.data.state.native.tokenGrafana}
						/>
					</Grid>
					<Grid item xs={12} sm={12} lg={4}>
						<Input
							label={I18n.t("Directory")}
							placeholder="/opt/iobroker/grafana/"
							callback={({ id, val }: EventInput) => this.props.callback.updateNative(id, val)}
							id="directory"
							value={this.props.data.state.native.directory || "/opt/iobroker/grafana/"}
						/>
					</Grid>
					<Grid item xs={12}>
						<Checkbox
							label={I18n.t("Active")}
							id="checkboxNoValueFound"
							isChecked={this.props.data.state.native.checkbox.checkboxNoValueFound}
							callback={this.onClickCheckbox}
							index={0}
						/>
					</Grid>
					<Grid item xs={12}>
						<Checkbox
							label="Resize Keyboard"
							id="resKey"
							isChecked={this.props.data.state.native.checkbox.resKey || false}
							callback={this.onClickCheckbox}
							title="Requests clients to resize the keyboard vertically for optimal fit (e.g., make the keyboard smaller if there are just two rows of buttons). Defaults to false, in which case the custom keyboard is always of the same height as the app's standard keyboard."
							class="title"
							index={1}
						/>
					</Grid>
					<Grid item xs={12}>
						<Checkbox
							label="One Time Keyboard"
							id="oneTiKey"
							isChecked={this.props.data.state.native.checkbox.oneTiKey || false}
							callback={this.onClickCheckbox}
							title="oneTimeKey"
							class="title"
							index={2}
						/>
					</Grid>
					<Grid item xs={12}>
						<Checkbox
							label={I18n.t("sendMenuAfterRestart")}
							id="sendMenuAfterRestart"
							isChecked={
								this.props.data.state.native.checkbox.sendMenuAfterRestart === null ||
								this.props.data.state.native.checkbox.sendMenuAfterRestart === undefined
									? true
									: this.props.data.state.native.checkbox.sendMenuAfterRestart
							}
							callback={this.onClickCheckbox}
							index={3}
						/>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default Settings;
