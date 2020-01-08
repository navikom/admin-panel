import React from "react";
import classNames from "classnames";

// @material-ui/core
import { createStyles, GridSize, makeStyles, Theme } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";

// core components
import CustomSelect from "components/CustomSelect/CustomSelect";
import AutocompleteInput from "components/CustomInput/AutocompleteInput";
import DateInput from "components/CustomInput/DateInput";
import LabeledInput from "components/CustomInput/LabeledInput";
import AutocompleteSelect from "components/CustomSelect/AutocompleteSelect";

// services
import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.typography.pxToRem(4)
    },
    autoWidth: {
      width: "100%"
    }
  })
);

type FormItemType = {
  onChange(e: string | number | Date | (string | number)[], key?: string): void;
  value?: number | string;
  values?: (number | string)[];
  min?: number;
  max?: number;
  date?: Date,
  from?: Date,
  to?: Date
  options?: string[];
  label?: string;
  gridSize?: { xs: GridSize, sm: GridSize, md: GridSize };
  placeholder?: string;
};

const FilterComponent = (props: FormItemType) => {
  const classes = useStyles();
  const autoWidth = classNames({
    [classes.autoWidth]: true
  });
  const from = props.from !== undefined;
  const to = props.to !== undefined;
  const min = props.min !== undefined;
  const max = props.max !== undefined;
  const container = classNames({
    [classes.container]: !(min && max) && !(from && to)
  });
  const containerInner = classNames({
    [classes.container]: (min && max) || (from && to)
  });
  return (
    <Grid item {...props.gridSize} className={container}>
      {
        props.value !== undefined && (
          <FormControl className={autoWidth}>
            {
              props.options ? (
                <CustomSelect
                  value={props.value}
                  onChange={props.onChange}
                  options={props.options}
                  label={props.label}
                />
              ) : (
                <LabeledInput value={props.value} onChange={(e: string) => props.onChange(e, "value")}/>
              )
            }
          </FormControl>
        )
      }
      {
        props.date !== undefined && (
          <FormControl className={autoWidth}>
            <DateInput date={props.date} onChange={(e: Date) => props.onChange(e, "date")}/>
          </FormControl>
        )
      }
      {
        props.values !== undefined && (
          <FormControl className={autoWidth}>
            {
              props.options === undefined ? (
                <AutocompleteInput
                  values={props.values}
                  onChange={(e: string[]) => props.onChange(e, "values")}
                />
              ) : (
                <FormControl>
                  <AutocompleteSelect
                    options={props.options}
                    values={props.values}
                    onChange={props.onChange}
                    placeholder={props.placeholder}
                    label={props.label}/>
                </FormControl>
              )
            }
          </FormControl>
        )
      }
      {
        from && to && (
          <Grid container>
            <Grid item xs={6} sm={6} md={6} className={containerInner}>
              <FormControl className={autoWidth}>
                <DateInput
                  label={Dictionary.defValue(DictionaryService.keys.from)}
                  date={props.from} onChange={(e: Date) => props.onChange(e, "from")}/>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6} md={6} className={containerInner}>
              <FormControl className={autoWidth}>
                <DateInput
                  label={Dictionary.defValue(DictionaryService.keys.to)}
                  date={props.to} onChange={(e: Date) => props.onChange(e, "to")}/>
              </FormControl>
            </Grid>
          </Grid>
        )
      }
      {
        from && !to && (
          <FormControl className={autoWidth}>
            <DateInput
              label={Dictionary.defValue(DictionaryService.keys.from)}
              date={props.from} onChange={(e: Date) => props.onChange(e, "from")}/>
          </FormControl>
        )
      }
      {
        !from && to && (
          <FormControl className={autoWidth}>
            <DateInput
              label={Dictionary.defValue(DictionaryService.keys.to)}
              date={props.to} onChange={(e: Date) => props.onChange(e, "to")}/>
          </FormControl>
        )
      }
      {
        min && max && (
          <Grid container>
            <Grid item xs={6} sm={6} md={6} className={containerInner}>
              <FormControl className={autoWidth}>
                <LabeledInput
                  label={Dictionary.defValue(DictionaryService.keys.min)}
                  value={props.min} onChange={(e: string) => props.onChange(e, "min")}/>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6} md={6} className={containerInner}>
              <FormControl className={autoWidth}>
                <LabeledInput
                  label={Dictionary.defValue(DictionaryService.keys.max)}
                  value={props.max} onChange={(e: string) => props.onChange(e, "max")}/>
              </FormControl>
            </Grid>
          </Grid>
        )
      }
      {
        min && !max && (
          <FormControl className={autoWidth}>
            <LabeledInput
              label={Dictionary.defValue(DictionaryService.keys.min)}
              value={props.min} onChange={(e: string) => props.onChange(e, "min")}/>
          </FormControl>
        )
      }
      {
        !min && max && (
          <FormControl className={autoWidth}>
            <LabeledInput
              label={Dictionary.defValue(DictionaryService.keys.max)}
              value={props.max} onChange={(e: string) => props.onChange(e, "max")}/>
          </FormControl>
        )
      }
    </Grid>
  )
};

export default ({ ...props }) => {
  const data = [props.first, props.second, props.third, props.fourth].filter(e => e !== undefined);
  const gridSize = { xs: 10, sm: 3, md: 3 };
  if(data.length === 1) {
    gridSize.sm = gridSize.md = 6;
  }
  if(data.length === 3) {
    gridSize.sm = gridSize.md = 4;
  }
  return (
    <Grid container>
      {
        data.map((prop, i: number) => <FilterComponent key={i} gridSize={gridSize} {...prop}/>)
      }
    </Grid>
  );
}
