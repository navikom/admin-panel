import React from "react";
import { observer } from "mobx-react-lite";

// @material-ui/icons
import { AddCircleOutline, DeleteOutline } from "@material-ui/icons";

// @material-ui/core
import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";

// services
import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";

import { ISegmentAttributeView } from "interfaces/ISegmentAttributeView";

import SegmentViewStore from "views/Segments/SegmentViewStore";
import FiltarableComponent from "views/Segments/components/FiltarableComponent";

// view store
import { SegmentAttributeViewStore } from "views/Segments/SegmentAttributeViewStore";
import { whiteColor } from "assets/jss/material-dashboard-react";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dividerWrapper: {
      width: "100%",
      position: "relative",
      height: theme.typography.pxToRem(20),
      marginBottom: theme.typography.pxToRem(10),
      borderBottom: "1px dashed rgba(0,0,0,.15)"
    },
    buttons: {
      position: "absolute",
      left: "50%",
      bottom: 0,
      transform: "translate(-50%, 50%)",
      backgroundColor: whiteColor
    },
    button: {
      fontSize: theme.typography.pxToRem(2),
      padding: "2px"
    },
    textRight: {
      textAlign: "right"
    },
    marginTop: {
      marginTop: theme.spacing(2)
    }
  })
);

interface IPropsArgument {
  index: number;
  count: number;
  addNewItem(): void;
  deleteItem(): void;
  item: ISegmentAttributeView;
  handleAndOr(): void;
}

const UserAttributeComponent = observer((props: IPropsArgument) => {
  const classes = useStyles();
  const first = {
    value: props.item.currentAttributeName,
    options: ["", ...Array.from(SegmentAttributeViewStore.attributeNamesKeys)],
    onChange: (e: string) => props.item.setAttributeName(e)
  };

  let second, third, fourth;
  if(props.item.currentExpression) {
    second = {
      value: props.item.currentExpression,
      options: props.item.expressions,
      onChange: (e: string) => props.item.setExpression(e)
    };
  }
  if(props.item.keys) {
    third = {
      [props.item.keys![0]]: props.item[props.item.keys![0]],
      onChange: (e: Date | string | number | (string | number)[]) => props.item.setValue(e, props.item.keys![0])
    };
    if(props.item.keys.length > 1) {
      fourth = {
        [props.item.keys![1]]: props.item[props.item.keys![1]],
        onChange: (e: Date | string | number | (string | number)[]) => props.item.setValue(e, props.item.keys![1])
      };
    }
  }

  const showAdd = (props.item.keys !== undefined || props.item.currentAttributeName !== undefined)
  && props.index + 1 === props.count ? true : false;

  const showTrash = props.count > 1 ? true : false;
  const andOr = props.index + 1 < props.count;
  const isAnd = SegmentAttributeViewStore.isAnd(props.index);

  return (
    <Grid container className={classes.marginTop}>
      <Grid item xs={12} sm={9} md={10}>
        <FiltarableComponent
          first={first}
          second={second || {}}
          third={third || {}}
          fourth={fourth || {}}
        />
      </Grid>
      <Grid item xs={12} sm={3} md={2} className={classes.textRight}>
        {
          showAdd && (
            <IconButton onClick={props.addNewItem}>
              <AddCircleOutline color="primary"/>
            </IconButton>
          )
        }
        {
          showTrash && (
            <IconButton onClick={props.deleteItem}>
              <DeleteOutline color="primary"/>
            </IconButton>
          )
        }
      </Grid>
      {
        andOr && (
          <div className={classes.dividerWrapper}>
            <ButtonGroup size="small" aria-label="small outlined button group" className={classes.buttons}>
              <Button
                className={classes.button}
                variant={isAnd ? "contained" : "outlined" }
                color={isAnd ? "primary" : "default"}
                onClick={props.handleAndOr}>
                {Dictionary.defValue(DictionaryService.keys.and)}
              </Button>
              <Button
                className={classes.button}
                variant={!isAnd ? "contained" : "outlined" }
                color={!isAnd ? "primary" : "default"}
                onClick={props.handleAndOr}>
                {Dictionary.defValue(DictionaryService.keys.or)}
              </Button>
            </ButtonGroup>
          </div>
        )
      }
    </Grid>
  )
});

export default observer(() => {
  if (!SegmentViewStore.segment) return null;


  return (
    <div>
      {
        SegmentAttributeViewStore.list.map((item: ISegmentAttributeView, i: number) =>
          <UserAttributeComponent
            key={i}
            item={item}
            addNewItem={() => SegmentAttributeViewStore.addNewItem()}
            deleteItem={() => SegmentAttributeViewStore.removeItem(i)}
            handleAndOr={() => SegmentAttributeViewStore.handleAndOr(i)}
            index={i}
            count={SegmentAttributeViewStore.list.length}/>)
      }
    </div>
  );
});
