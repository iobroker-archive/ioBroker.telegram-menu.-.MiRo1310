import React, { Component } from "react";
import PopupContainer from "@/components/popupCards/PopupContainer";
import DropBox from "@/pages/AppDropBoxContent";
import { onDragStart, onDragEnd, onDragOver, onDrop, onDrag, onMouseEnter, onMouseLeave } from "@/lib/movePosition";
import { PropsMainDropBox } from "admin/app";
import { EventButton } from "../types/event";

class MainDropBox extends Component<PropsMainDropBox> {
	constructor(props: PropsMainDropBox) {
		super(props);
		this.state = {};
	}
	closeDropBox = ({}: EventButton): void => {
		this.props.callback.setStateApp({ showDropBox: false });
	};

	render(): React.ReactNode {
		return (
			<PopupContainer
				class="DropBox-PopupContainer"
				reference={this.props.data.dropBoxRef}
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
				setState={this.props.callback.setStateApp}
			>
				<DropBox data={this.props.data} index={this.props.data.state.draggingRowIndex} callback={this.props.callback} />
			</PopupContainer>
		);
	}
}

export default MainDropBox;
