import React, { Component } from "react";
import PopupContainer from "@/components/popupCards/PopupContainer";
import DropBox from "@/pages/AppDropBoxContent";
import { onDragStart, onDragEnd, onDragOver, onDrop, onDrag, onMouseEnter, onMouseLeave } from "@/lib/movePosition";
import { PropsMainDropBox } from "admin/app";

class MainDropBox extends Component<PropsMainDropBox> {
	constructor(props) {
		super(props);
		this.state = {};
	}
	closeDropBox = () => {
		this.props.callback.setState({ showDropBox: false });
	};

	render() {
		return (
			<PopupContainer
				class="DropBox-PopupContainer"
				reference={this.props.dropBoxRef}
				width="99%"
				height="25%"
				title="DropBox"
				callback={this.closeDropBox}
				closeBtn={true}
				drag="true"
				onDragStart={onDragStart}
				onDragEnd={onDragEnd}
				onDragOver={onDragOver}
				onDrop={onDrop}
				onDrag={onDrag}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				setState={this.setState.bind(this)}
			>
				<DropBox
					tab={this.props.state.tab}
					subTab={this.props.state.subTab}
					index={this.props.state.draggingRowIndex}
					activeMenu={this.props.state.activeMenu}
					native={this.props.state.native}
					callback={this.props.callback}
				/>
			</PopupContainer>
		);
	}
}

export default MainDropBox;
