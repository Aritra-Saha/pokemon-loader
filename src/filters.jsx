import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FlareIcon from '@mui/icons-material/Flare';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';

const Filters = ({ shiny, setShiny, isBaby, setIsBaby }) => {
    return (
        <ToggleButtonGroup>
            <ToggleButton selected={shiny} onClick={setShiny}>
                <FlareIcon/>
            </ToggleButton>
            <ToggleButton selected={isBaby} onClick={setIsBaby}>
                <ChildFriendlyIcon/>
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

export default Filters;