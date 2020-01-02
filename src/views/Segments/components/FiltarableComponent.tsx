import React from "react";
import classNames from "classnames";

// @material-ui/core
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";

// core components
import CustomSelect from "components/CustomSelect/CustomSelect";
import BootstrapInput from "components/CustomInput/BootstrapInput";
import AutocompleteInput from "components/CustomInput/AutocompleteInput";
import DateInput from "components/CustomInput/DateInput";
import LabeledInput from "components/CustomInput/LabeledInput";
import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";
import AutocompleteSelect from "components/CustomSelect/AutocompleteSelect";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    marginLeft: {
      marginLeft: theme.spacing(1)
    },
    inputWidth: {
      width: theme.typography.pxToRem(100)
    },
    dateWidth: {
      width: theme.typography.pxToRem(120)
    },
    autoCompleteWidth: {
      width: theme.typography.pxToRem(200)
    }
  })
);

export default ({ ...props }) => {
  const classes = useStyles();
  const small = classNames(classes.marginLeft, classes.inputWidth);
  const smallDate = classNames(classes.marginLeft, classes.dateWidth);
  const autocomplete = classNames(classes.marginLeft, classes.autoCompleteWidth);
  return (
    <Grid container>
      <FormControl>
        <CustomSelect
          value={props.first.value}
          onChange={props.first.onChange}
          options={props.first.options}
          label={props.first.label}
        />
      </FormControl>
      {
        props.second && props.second.value !== undefined && (
          <FormControl className={classes.marginLeft}>
            <CustomSelect
              value={props.second.value}
              onChange={props.second.onChange}
              options={props.second.options}
              label={props.second.label}
            />
          </FormControl>
        )
      }
      {
        props.second && props.second.date !== undefined && (
          <FormControl className={classes.marginLeft}>
            <DateInput date={props.second.date} onChange={(e: Date) => props.second.onChange(e, "date")}/>
          </FormControl>
        )
      }
      {
        props.second && props.second.from !== undefined && (
          <FormControl className={classes.marginLeft}>
            <DateInput
              label={Dictionary.defValue(DictionaryService.keys.from)}
              date={props.second.from} onChange={(e: Date) => props.second.onChange(e, "from")}/>
          </FormControl>
        )
      }
      {
        props.second && props.second.to !== undefined && (
          <FormControl className={classes.marginLeft}>
            <DateInput
              label={Dictionary.defValue(DictionaryService.keys.to)}
              date={props.second.to} onChange={(e: Date) => props.second.onChange(e, "to")}/>
          </FormControl>
        )
      }
      {
        props.third && props.third.value !== undefined && (
          <FormControl className={classes.marginLeft}>
            {
              !props.third.componentType ? (
                <LabeledInput value={props.third.value} onChange={(e: string) => props.third.onChange(e, "value")}/>
              ) : (
                <CustomSelect
                  value={props.third.value}
                  onChange={props.third.onChange}
                  options={props.third.options}
                  label={props.third.label}
                />
              )
            }

          </FormControl>
        )
      }
      {
        props.third && props.third.date !== undefined && (
          <FormControl className={smallDate}>
            <DateInput date={props.third.date} onChange={(e: Date) => props.third.onChange(e, "date")}/>
          </FormControl>
        )
      }
      {
        props.third && props.third.from !== undefined && (
          <FormControl className={smallDate}>
            <DateInput
              label={Dictionary.defValue(DictionaryService.keys.from)}
              date={props.third.from} onChange={(e: Date) => props.third.onChange(e, "from")}/>
          </FormControl>
        )
      }
      {
        props.third && props.third.min !== undefined && (
          <FormControl className={small}>
            <LabeledInput
              label={Dictionary.defValue(DictionaryService.keys.from)}
              value={props.third.min} onChange={(e: string) => props.third.onChange(e, "min")}/>
          </FormControl>
        )
      }
      {
        props.third && props.third.max !== undefined && (
          <FormControl className={small}>
            <LabeledInput label="max" value={props.third.max} onChange={(e: string) => props.third.onChange(e, "max")}/>
          </FormControl>
        )
      }
      {
        props.third && props.third.values !== undefined && (
          <FormControl className={autocomplete}>
            <AutocompleteInput
              values={props.third.values}
              onChange={(e: string[]) => props.third.onChange(e, "values")}
            />
          </FormControl>
        )
      }
      {
        props.fourth && props.fourth.values !== undefined && (
          <FormControl className={small}>
            <AutocompleteSelect
              options={props.fourth.options}
              values={props.fourth.values}
              onChange={props.fourth.onChange}
              placeholder={props.fourth.placeholder}
              label={props.fourth.label}/>
          </FormControl>
        )
      }
      {
        props.fourth && props.fourth.to !== undefined && (
          <FormControl className={smallDate}>
            <DateInput
              label={Dictionary.defValue(DictionaryService.keys.to)}
              date={props.fourth.to} onChange={(e: Date) => props.fourth.onChange(e, "to")}/>
          </FormControl>
        )
      }
      {
        props.fourth && props.fourth.max !== undefined && (
          <FormControl className={small}>
            <LabeledInput label="max" value={props.fourth.max} onChange={(e: string) => props.fourth.onChange(e, "max")}/>
          </FormControl>
        )
      }
    </Grid>
  );
}
