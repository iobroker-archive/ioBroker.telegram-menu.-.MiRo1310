import React, { Component } from "react";
import { TableHead, TableCell, TableRow } from "@mui/material";
import { I18n } from "@iobroker/adapter-react-v5";
import { PropsTableNavHeader } from "admin/app";

class TabNavHeader extends Component<PropsTableNavHeader> {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<TableHead>
				<TableRow>
					{this.props.entries.map((entry, index) => (
						<TableCell key={index} align="left">
							<span title={entry.title ? I18n.t(entry.title) : undefined}>{I18n.t(entry.headline)}</span>
						</TableCell>
					))}

					<TableCell align="center" className="cellIcon"></TableCell>
					<TableCell align="center" className="cellIcon"></TableCell>
					<TableCell align="center" className="cellIcon"></TableCell>
				</TableRow>
			</TableHead>
		);
	}
}

export default TabNavHeader;