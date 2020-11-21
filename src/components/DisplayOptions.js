import React, { useContext } from "react";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import {
  FormatListBulleted as FormatListBulletedIcon,
  WbIncandescent as WbIncandescentIcon
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import cx from "classnames";
import {
  DisplayOptionsContext,
  DispatchDisplayOptionContext
} from "../Contexts";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  "display-options__button": {
    borderRadius: 0,
    borderColor: "#999"
  },
  "display-options__button-icon": {
    marginRight: theme.spacing(1)
  }
}));

const DisplayOptions = () => {
  const classes = useStyles();
  const displayOptions = useContext(DisplayOptionsContext);
  const dispatchDisplayOption = useContext(DispatchDisplayOptionContext);

  return (
    <ToggleButtonGroup className={classes.root}>
      <ToggleButton
        className={cx({
          [classes["display-options__button"]]: true,
          [classes["display-options__button--active"]]:
            displayOptions.showDetails
        })}
        value="showDetails"
        data-testid="toggle-details"
        selected={displayOptions.showDetails}
        onClick={() => dispatchDisplayOption({ type: "toggleShowDetails" })}
      >
        <FormatListBulletedIcon
          className={classes["display-options__button-icon"]}
        />
        {displayOptions.showDetails ? "Collapse All" : "Expand All"}
      </ToggleButton>
      <ToggleButton
        className={cx({
          [classes["display-options__button"]]: true,
          [classes["display-options__button--active"]]: displayOptions.dark
        })}
        value="toggleDark"
        data-testid="toggle-dark"
        selected={displayOptions.dark}
        onClick={() => dispatchDisplayOption({ type: "toggleDark" })}
      >
        <WbIncandescentIcon
          className={classes["display-options__button-icon"]}
        />
        Dark
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default DisplayOptions;
