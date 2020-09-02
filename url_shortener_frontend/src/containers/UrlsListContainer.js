import React from "react";
import UrlItem from "../components/UrlItem";

import { makeStyles } from "@material-ui/core/styles";
import { List, Divider, Card ,Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

function UrlsListContainer(props) {
  const classes = useStyles();

  function renderUrls() {
    let uiItems = [];
    props.urls.forEach((url, index) => {
      if (index) {
        uiItems.push(<Divider component="li" />);
      }
      uiItems.push(
        <UrlItem
          key={url.id}
          card={url}
        />
      );
    });

    return uiItems;
  }

  return (
    <Card
      style={{ width: "800px", minWidth: "800px", marginBottom: "20px" }}
      variant="outlined"
    ><Typography variant="h5" component="h2">
    All Shortened URLs
  </Typography>
      <List className={classes.root}>{renderUrls()}</List>
    </Card>
  );
}

export default UrlsListContainer;
