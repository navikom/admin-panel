import React from "react";
import {IconButton, InputAdornment, OutlinedInput} from "@material-ui/core";
import {ThemedInput} from "components/CustomInput/BootstrapInput";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";

const Adornment = ({...props}) => {
 return (
   <IconButton
     onClick={props.onClick}
   >
    {props.component}
   </IconButton>
 );
};

const InputWithIcon = ({...props}) => {
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
 return (
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
          {startAdornments.map((prop: any, i: number) => <Adornment {...prop} key={i} />)}
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
          {endAdornments.map((prop: any, i: number) => <Adornment {...prop} key={i} />)}
         </InputAdornment>
       )
     }
   />
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
