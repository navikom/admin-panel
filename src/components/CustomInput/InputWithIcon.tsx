import React, {ReactNode} from "react";
import PropTypes from "prop-types";

// @material-ui/core
import {createStyles, IconButton, InputAdornment, makeStyles, OutlinedInput, Theme} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Popper from "@material-ui/core/Popper";

// @material-ui/icons
import {ArrowDropDown} from "@material-ui/icons";

// components
import {ThemedInput} from "components/CustomInput/BootstrapInput";

import useStyles from "assets/jss/material-dashboard-react/responsiveTypeStyles";

const extraStyles = makeStyles((theme: Theme) =>
  createStyles({
   popper: {
    width: theme.typography.pxToRem(50),
    backgroundColor: theme.palette.background.paper,
    border: "1px solid rgba(0,0,0,.15)",
    zIndex: 4
   }
  }));

const Adornment = ({...props}) => {
 const {component, ...rest} = props;
 return (
   <IconButton
     {...rest}
   >
    {component}
   </IconButton>
 );
};

const InputWithIcon = ({...props}) => {
 const classes = useStyles();
 const extraClasses = extraStyles();
 const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
 const [adornments, setAdornments] = React.useState<{component: ReactNode, onClick: () => void}[]>([]);
 const {
  input,
  startAdornment,
  startAdornments,
  endAdornment,
  endAdornments,
  startAdornmentClick,
  endAdornmentClick,
  divider,
  ...rest
 } = props;

 const handlePopperOpen = (list: {component: ReactNode, onClick: () => void}[]) => (event: React.MouseEvent<HTMLElement>) => {
  setAdornments(list);
  setAnchorEl(event.currentTarget === anchorEl ? null : event.currentTarget);
 };

 const isPopperOpen = Boolean(anchorEl);

 const popperClose = () => {
  setAnchorEl(null);
 };

 return (
   <div>
    <OutlinedInput
     {...rest}
     {...(input || {})}
     labelWidth={0}
     startAdornment={startAdornment ?
       <InputAdornment position="start">
        <Adornment onClick={startAdornmentClick} component={startAdornment} />
       </InputAdornment>
       :
       startAdornments && (
         <InputAdornment position="start">
          <div className={classes.sectionMobile}>
           <Adornment onClick={handlePopperOpen(startAdornments)} component={<ArrowDropDown />}/>
          </div>
          <div className={classes.sectionDesktop}>
           {startAdornments.map((prop: any, i: number) => <Adornment {...prop} key={i} />)}
          </div>
          <Divider orientation="vertical" {...(divider || {})} />
         </InputAdornment>
       )
     }
     endAdornment={endAdornment ?
       <InputAdornment position="end">
        <Adornment onClick={endAdornmentClick} component={endAdornment} />
       </InputAdornment>
       :
       endAdornments && (
         <InputAdornment position="end">
          <Divider orientation="vertical" {...(divider || {})} />
          <div className={classes.sectionMobile}>
           <Adornment onClick={handlePopperOpen(endAdornments)} component={<ArrowDropDown />}/>
          </div>
          <div className={classes.sectionDesktop}>
           {endAdornments.map((prop: any, i: number) => <Adornment {...prop} key={i} />)}
          </div>
         </InputAdornment>
       )
     }
   />
    <Popper
      className={extraClasses.popper}
      open={isPopperOpen}
      anchorEl={anchorEl}
      placement="bottom-end"
      transition>
     {adornments && adornments.map((prop: any, i: number) =>
       <Adornment key={i} {...prop} onClick={() => {
      popperClose();
      prop.onClick(anchorEl);
     }} />)}
    </Popper>
   </div>
 );
};

InputWithIcon.propTypes = {
 classes: PropTypes.object.isRequired,
 input: PropTypes.object,
 endAdornments: PropTypes.array,
 endAdornment: PropTypes.node,
 startAdornments: PropTypes.array,
 startAdornment: PropTypes.node,
 startAdornmentClick: PropTypes.func,
 endAdornmentClick: PropTypes.func,
 divider: PropTypes.object
};

export default ThemedInput(InputWithIcon);
