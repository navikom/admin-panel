import { createStyles, makeStyles } from "@material-ui/core";

export default makeStyles( () => createStyles({
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: "\"Josefin Sans\", \"Helvetica\", \"Arial\", sans-serif",
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: 400,
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: 300,
    fontFamily: "'Josefin Sans', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  codeWrapper: {
    width: "100%",
    padding: "5px",
    backgroundColor: "#f4f4f4"
  },
  media: {
    backgroundSize: "contain",
    height: "300px"
  }
}));
