import { MdLinearScale } from "react-icons/md";
import { TASKBAR_HEIGHT } from "../constants";
import { UseWindowManager } from "../WindowManager";
import app_list from "../../app_list.json";

export default function Taskbar() {
	const { entities, minimizeEntitySwitch, pushEntityForward } =
		UseWindowManager();

	const renderable = Object.entries(entities);

	let max_z_index_index = 0;
	for (let i = 1; i < renderable.length; ++i)
		if (renderable[i][1].z_index > renderable[max_z_index_index][1].z_index)
			max_z_index_index = i;

	function handleClick(i: number) {
		if (i === max_z_index_index)
			minimizeEntitySwitch(i, !entities[i].minimized);
		else pushEntityForward(i);
	}

	return (
		<div
			style={{
				height: TASKBAR_HEIGHT,
				width: "100vw",
				display: "flex",
				gap: 10,
				justifyContent: "center",
				alignItems: "center",
				backgroundImage:
					"linear-gradient(to up, rgb(36, 29, 35), rgb(109, 109, 109))",
			}}
		>
			{renderable.map(([key, value], i) => {
				return (
					<div
						key={key}
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							position: "relative",
							top: 2,
							backgroundColor: i === max_z_index_index ? "gray" : "black",
							padding: "4px 6px",
							borderRadius: 10,
						}}
						onClick={() => handleClick(i)}
					>
						<img
							src={app_list[value.app_list_index].icon}
							width={35}
							height={35}
							alt=""
							style={{ position: "relative", top: 3 }}
						/>
						<MdLinearScale style={{ position: "relative", bottom: 1 }} />
					</div>
				);
			})}
		</div>
	);
}
