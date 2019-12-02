import React  from "react";
import { observer } from "mobx-react-lite";
import { sortable } from "react-sortable";
import { DropzoneDialog } from "material-ui-dropzone/dist";
import classNames from "classnames";

// @material-ui/icons
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Delete, WallpaperOutlined } from "@material-ui/icons";

// @material-ui/core
import { Card, createStyles, makeStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import Divider from "@material-ui/core/Divider";

// services
import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";

// interfaces
import { IAppsImages } from "interfaces/IAppsImages";

// core components
import Button from "components/CustomButtons/Button";
import CustomInput from "components/CustomInput/CustomInput";
import ProgressButton from "components/CustomButtons/ProgressButton";
import Fab from "components/CustomButtons/Fab";
import { AppDataStore } from "views/AppsList/components/AppData/AppDataStore";


const useCardStyles = makeStyles((theme: Theme) => createStyles({
  card: {
    position: "relative",
    width: "100%"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    position: "absolute",
    top: 0,
    width: "95%",
    justifyContent: "flex-end"
  },
  button: {
    opacity: .5,
    "&:hover": {
      opacity: .7
    }
  }
}));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginBottom: theme.typography.pxToRem(20)
    },
    note: {
      fontWeight: theme.typography.fontWeightBold,
      marginLeft: theme.typography.pxToRem(20),
      width: theme.typography.pxToRem(150),
      opacity: .4
    },
    bottom: {
      alignSelf: "flex-end"
    },
    center: {
      alignSelf: "center"
    },
    divider: {
      marginTop: theme.typography.pxToRem(10),
      marginBottom: theme.typography.pxToRem(10)
    }
  })
);

const Item = ({ ...props }) => {
  return (
    <Grid item {...props} xs={12} sm={6} md={4}>
      {props.children}
    </Grid>
  );
};

const SortableItem = sortable(Item);

type ImageItemType = {
  image: IAppsImages;
  items?: IAppsImages[];
  index: number;
  onSortItems(items: IAppsImages[]): void;
  onDeleteItem(): void;
}

const ImageItem = observer((props: ImageItemType) => {
  const classes = useCardStyles();
  return <SortableItem
    onSortItems={props.onSortItems}
    items={props.items}
    sortId={props.index}>
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={props.image.path()}
        title="Contemplative Reptile"
      />
      <CardActions className={classes.actions}>
        <Fab color="primary" aria-label="add" className={classes.button} onClick={props.onDeleteItem}>
          <Delete />
        </Fab>
      </CardActions>
    </Card>
  </SortableItem>;
});

const AppData = observer((props) => {

  const classes = useStyles();
  const bottomNote = classNames(classes.note, classes.bottom);
  return (
    <Grid container>
      <Grid container item direction="row" className={classes.container}>
        <Typography variant="subtitle2" className={bottomNote}>
          {Dictionary.defValue(DictionaryService.keys.title)}:
        </Typography>
        <Typography variant="h5">{AppDataStore.app!.title}</Typography>
      </Grid>
      <Grid container item direction="row" className={classes.container}>
        <Typography variant="subtitle2" className={bottomNote}>
          {Dictionary.defValue(DictionaryService.keys.createdAt)}:
        </Typography>
        <Typography color="inherit">{Dictionary.timeDateString(AppDataStore.app!.createdAt)}</Typography>
      </Grid>
      <Grid container item direction="row" className={classes.container}>
        <Typography variant="subtitle2" className={classes.note}>
          {Dictionary.defValue(DictionaryService.keys.description)}:
        </Typography>
        <Grid item sm={10} md={10} xs={12}>
          <CustomInput
            error={(AppDataStore.errors || {}).description !== undefined}
            helperText={(AppDataStore.errors || {}).description}
            id="description"
            formControlProps={{
              fullWidth: true,
              style: { margin: 0 }
            }}
            inputProps={{
              onChange: ({ ...e }) => AppDataStore.onInput({ description: e.target.value }),
              value: (AppDataStore.description || ""),
              placeholder: Dictionary.defValue(DictionaryService.keys.enterDescription),
              multiline: true,
              style: { border: "1px solid #F6F6F6", marginTop: 0, padding: "5px" },
              rows: 2
            }}
          />
        </Grid>
      </Grid>
      <Grid item className={classes.container}>
        <Typography variant="subtitle2" className={classes.note}>
          {Dictionary.defValue(DictionaryService.keys.screenshots)}
        </Typography>
      </Grid>
      <Grid container item spacing={2} className={classes.container}>

        {
          (AppDataStore.app!.images || []).map((e: IAppsImages, i: number) =>
            <ImageItem key={i}
                       image={e}
                       items={AppDataStore.app!.images}
                       onSortItems={(items) => AppDataStore.onSortItems(items)} index={i}
                       onDeleteItem={() => AppDataStore.deleteAppImage(e)}
            />)
        }
      </Grid>
      <Grid container item>
        <Button
          onClick={() => AppDataStore.setOpen(true)}
          variant="contained"
          color="primary"
          startIcon={<WallpaperOutlined/>}
        >{Dictionary.defValue(DictionaryService.keys.upload)}</Button>
      </Grid>
      <Grid item xs={12}>
        <Divider variant="middle" className={classes.divider}/>
      </Grid>
      <Grid container item sm={12} xs={12} justify="center">
        <ProgressButton
          onClick={() => AppDataStore.saveApp()}
          disabled={AppDataStore.isDisabled}
          variant="contained"
          loading={AppDataStore.fetching}
          color="primary"
          text={Dictionary.defValue(DictionaryService.keys.save)}
          startIcon={<CloudUploadIcon/>}
        />
      </Grid>

      <DropzoneDialog
        dropzoneText={Dictionary.defValue(DictionaryService.keys.dragAndDrop)}
        open={AppDataStore.open}
        onSave={(e) => AppDataStore.setFiles(e)}
        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={() => AppDataStore.setOpen(false)}
      />

    </Grid>
  );
});

export default AppData;
