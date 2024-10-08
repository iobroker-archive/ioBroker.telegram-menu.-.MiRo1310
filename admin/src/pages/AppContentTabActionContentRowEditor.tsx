import { BtnCircleAdd } from "@/components/btn-Input/btn-circle-add";
import BtnSmallAdd from "@/components/btn-Input/btn-small-add";
import BtnSmallRemove from "@/components/btn-Input/btn-small-remove";
import BtnSmallSearch from "@/components/btn-Input/btn-small-search";
import Checkbox from "@/components/btn-Input/checkbox";
import Input from "@/components/btn-Input/input";
import Select from "@/components/btn-Input/select";
import { isChecked } from "@/lib/Utils.js";
import { addNewRow, deleteRow, moveItem, saveRows, updateData, updateId, updateTrigger } from "@/lib/actionUtils.js";
import {
	handleDragEnd,
	handleDragEnter,
	handleDragOver,
	handleDragStart,
	handleMouseOut,
	handleMouseOver,
	handleStyleDragOver,
} from "@/lib/dragNDrop.js";
import ActionEditHeader from "@/pages/AppContentTabActionContentRowEditorHeader";
import { type IobTheme, SelectID, Theme } from "@iobroker/adapter-react-v5";
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { PropsRowEditPopupCard, StateRowEditPopupCard } from "admin/app";
import React, { Component } from "react";

const theme: IobTheme = Theme("light");

class RowEditPopupCard extends Component<PropsRowEditPopupCard, StateRowEditPopupCard> {
	constructor(props) {
		super(props);
		this.state = {
			rows: [],
			trigger: "",
			data: {},
			showSelectId: false,
			selectIdValue: "",
			indexID: 0,
			dropStart: 0,
			dropEnd: 0,
			dropOver: 0,
			mouseOverNoneDraggable: false,
			itemForID: "",
		};
	}

	componentDidMount() {
		saveRows(this.props, this.setState.bind(this), this.props.entries, this.state.rows);
	}
	componentDidUpdate(prevProps) {
		if (prevProps.newRow !== this.props.newRow) {
			saveRows(this.props, this.setState.bind(this), this.props.entries, this.props.newRow);
		}
	}
	updateData = (obj) => {
		updateData(obj, this.props, this.setState.bind(this), this.props.entries);
	};

	handleDrop = (index) => {
		if (index !== this.state.dropStart) {
			moveItem(
				this.state.dropStart,
				this.props,
				this.props.entries,
				this.setState.bind(this),
				this.props.entries,
				index - this.state.dropStart,
			);
		}
	};

	disableInput = (name: string, index: number): boolean => {
		if (this.state?.rows?.[index]?.switch_checkbox === "true" && name === "values") {
			return true;
		}
		return false;
	};

	render() {
		return (
			<div className="Edit-Container">
				{this.props.newRow.trigger ? (
					<div className="Edit-Container-Trigger">
						<Select
							width="10%"
							selected={this.props.newRow.trigger[0]}
							options={this.props.newUnUsedTrigger}
							id="trigger"
							callback={(value) => updateTrigger(value, this.props, this.setState.bind(this), this.props.entries)}
							callbackValue="event.target.value"
							label="Trigger"
							placeholder="Select a Trigger"
						/>
					</div>
				) : null}
				{this.props.newRow.parse_mode ? (
					<div className="Edit-Container-ParseMode">
						<Checkbox
							id="parse_mode"
							index={0}
							callback={this.updateData}
							callbackValue="event"
							isChecked={isChecked(this.props.newRow.parse_mode[0])}
							obj={true}
							label="Parse Mode"
						/>
					</div>
				) : null}
				<TableContainer component={Paper} className="Edit-Container-TableContainer">
					<Table stickyHeader aria-label="sticky table">
						<ActionEditHeader entries={this.props.entries} buttons={this.props.buttons} />
						<TableBody>
							{this.state.rows
								? this.state.rows.map((row, indexRow: number) => (
										<TableRow
											key={indexRow}
											sx={{ "&:last-child td, &:last-child td": { border: 0 } }}
											draggable
											onDrop={() => this.handleDrop(indexRow)}
											onDragStart={(event) =>
												handleDragStart(indexRow, event, this.state.mouseOverNoneDraggable, this.setState.bind(this))
											}
											onDragEnd={() => handleDragEnd(this.setState.bind(this))}
											onDragOver={(event) => handleDragOver(indexRow, event)}
											onDragEnter={() => handleDragEnter(indexRow, this.setState.bind(this))}
											onDragLeave={() => handleDragEnter(indexRow, this.setState.bind(this))}
											style={handleStyleDragOver(indexRow, this.state.dropOver, this.state.dropStart)}
										>
											{row.IDs || row.IDs === "" ? (
												<TableCell component="td" scope="row" align="left">
													<span onMouseEnter={(e) => handleMouseOver(e)} onMouseLeave={(e) => handleMouseOut(e)}>
														<Input
															width="calc(100% - 50px)"
															value={row.IDs}
															margin="0px 2px 0 2px"
															id="IDs"
															index={indexRow}
															callback={this.updateData}
															callbackValue="event.target.value"
															function="manual"
															className="noneDraggable"
														/>
													</span>

													<BtnSmallSearch
														callback={() =>
															this.setState({
																showSelectId: true,
																selectIdValue: row.IDs,
																indexID: indexRow,
																itemForID: "IDs",
															})
														}
													/>
												</TableCell>
											) : null}
											{this.props.entries.map((entry, i) =>
												!entry.checkbox && entry.name != "IDs" && entry.name != "trigger" ? (
													<TableCell align="left" key={i}>
														<Input
															width={entry.search ? "calc(100% - 50px)" : "100%"}
															value={typeof row[entry.name] === "string" ? row[entry.name].replace(/&amp;/g, "&") : ""}
															margin="0px 2px 0 5px"
															id={entry.name}
															index={indexRow}
															callback={this.updateData}
															callbackValue="event.target.value"
															function="manual"
															disabled={this.disableInput(entry.name, indexRow)}
															type={entry.type}
															inputWidth={
																!entry.search || entry.name === "returnText" || entry.name === "text"
																	? "calc(100% - 28px)"
																	: ""
															}
															className="noneDraggable"
															onMouseOver={handleMouseOver}
															onMouseLeave={handleMouseOut}
															setState={this.setState.bind(this)}
														>
															{entry.btnCircleAdd ? (
																<BtnCircleAdd
																	callbackValue={{
																		index: indexRow,
																		entry: entry.name,
																		subCard: this.props.subCard,
																	}}
																	callback={this.props.openHelperText}
																/>
															) : null}
														</Input>
														{entry.search ? (
															<BtnSmallSearch
																callback={() =>
																	this.setState({
																		showSelectId: true,
																		selectIdValue: row[entry.name],
																		indexID: indexRow,
																		itemForID: entry.name,
																	})
																}
															/>
														) : null}
													</TableCell>
												) : entry.checkbox && entry.name != "parse_mode" ? (
													<TableCell align="left" className="checkbox" key={i}>
														<Checkbox
															id={entry.name}
															index={indexRow}
															callback={this.updateData}
															callbackValue="event"
															isChecked={isChecked(row[entry.name])}
															obj={true}
														/>
													</TableCell>
												) : null,
											)}

											{this.props.buttons.add ? (
												<TableCell align="center" className="cellIcon">
													<BtnSmallAdd
														callback={() => addNewRow(indexRow, this.props, this.props.entries, this.setState.bind(this))}
														index={indexRow}
													/>
												</TableCell>
											) : null}
											{this.props.buttons.remove ? (
												<TableCell align="center" className="cellIcon">
													<BtnSmallRemove
														callback={(index) =>
															deleteRow(
																index,
																this.props,
																this.props.entries,
																this.setState.bind(this),
																this.props.entries,
															)
														}
														index={indexRow}
														disabled={this.state.rows.length == 1 ? "disabled" : ""}
													/>
												</TableCell>
											) : null}
										</TableRow>
									))
								: null}
						</TableBody>
					</Table>
				</TableContainer>
				{this.state.showSelectId ? (
					<SelectID
						key="tableSelect"
						imagePrefix="../.."
						dialogName={this.props.data.adapterName}
						themeType={this.props.data.themeType}
						theme={theme}
						socket={this.props.data.socket}
						filters={{}}
						selected={this.state.selectIdValue}
						onClose={() => this.setState({ showSelectId: false })}
						root={(this.props.searchRoot && this.props.searchRoot.root) || undefined}
						types={this.props.searchRoot && this.props.searchRoot.type ? this.props.searchRoot.type : undefined}
						onOk={(selected) => {
							this.setState({ showSelectId: false });
							updateId(selected, this.props, this.state.indexID, this.setState.bind(this), this.props.entries, this.state.itemForID);
						}}
					/>
				) : null}
			</div>
		);
	}
}

export default RowEditPopupCard;
