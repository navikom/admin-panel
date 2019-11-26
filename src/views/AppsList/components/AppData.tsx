import React, { useState } from "react";
import { DropzoneDialog } from "material-ui-dropzone/dist";
import classNames from "classnames";

// @material-ui/icons
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {WallpaperOutlined} from "@material-ui/icons";

// @material-ui/core
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// services
import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";

// core components
import Button from "components/CustomButtons/Button";
import CustomInput from "components/CustomInput/CustomInput";
import Divider from "@material-ui/core/Divider";
import { Apps } from "models/App/AppsStore";
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "components/Snackbar/Snackbar";
import { IApp } from "interfaces/IApp";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginBottom: theme.typography.pxToRem(20),
    },
    note: {
      fontWeight: theme.typography.fontWeightBold,
      marginLeft: theme.typography.pxToRem(20),
      width: theme.typography.pxToRem(150),
      opacity: .4
    },
    bottom: {
      alignSelf: "flex-end",
    },
    center: {
      alignSelf: "center",
    },
    divider: {
      marginTop: theme.typography.pxToRem(10),
      marginBottom: theme.typography.pxToRem(10)
    }
  })
);

const AppData = ({ ...props }) => {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState(props.app.description);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({} as {[key: string]: string});

  const classes = useStyles();
  const bottomNote = classNames(classes.note, classes.bottom);

  const handleChange = (key: "description", value: string) => {
    const data = Apps.onInput({[key]: value}) || {};
    setErrors(data);
    if(key === "description") {
      setDescription(value);
    }
  };

  return (
    <Grid container>
      <Grid container item direction="row" className={classes.container}>
        <Typography variant="subtitle2" className={bottomNote}>
          {Dictionary.defValue(DictionaryService.keys.title)}:
        </Typography>
        <Typography variant="h5">{props.app.title}</Typography>
      </Grid>
      <Grid container item direction="row" className={classes.container}>
        <Typography variant="subtitle2" className={bottomNote}>
          {Dictionary.defValue(DictionaryService.keys.createdAt)}:
        </Typography>
        <Typography color="inherit">{Dictionary.timeDateString(props.app.createdAt)}</Typography>
      </Grid>
      <Grid container item direction="row" className={classes.container}>
        <Typography variant="subtitle2" className={classes.note}>
          {Dictionary.defValue(DictionaryService.keys.description)}:
        </Typography>
        <Grid item sm={10} md={10} xs={12}>
          <CustomInput
            error={errors.description !== undefined}
            helperText={errors.description}
            value={description}
            labelText={props.app.description}
            id="description"
            formControlProps={{
              fullWidth: true,
              style: {margin: 0}
            }}
            inputProps={{
              onChange: ({...e}) => handleChange("description", e.target.value),
              placeholder: Dictionary.defValue(DictionaryService.keys.enterDescription),
              multiline: true,
              style: {border: "1px solid #F6F6F6", marginTop: 0, padding: "5px"},
              rows: 2
            }}
          />
        </Grid>

      </Grid>
      <Grid container item>
        <Typography variant="subtitle2" className={classes.note}>
          {Dictionary.defValue(DictionaryService.keys.screenshots)}
        </Typography>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          color="primary"
          startIcon={<WallpaperOutlined />}
        >{Dictionary.defValue(DictionaryService.keys.upload)}</Button>
      </Grid>
      <Grid item xs={12}>
        <Divider variant="middle" className={classes.divider}/>
      </Grid>
      <Grid container item sm={12} xs={12} justify="center">
        <Button
          onClick={() => Apps.saveApp(props.app, {description} as IApp, files)}
          variant="contained"
          color="primary"
          startIcon={<CloudUploadIcon />}
        >{Dictionary.defValue(DictionaryService.keys.save)}</Button>
      </Grid>

      <DropzoneDialog
        dropzoneText={Dictionary.defValue(DictionaryService.keys.dragAndDrop)}
        open={open}
        onSave={setFiles}
        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={() => setOpen(false)}
      />

    </Grid>
  );
};

export default AppData;
