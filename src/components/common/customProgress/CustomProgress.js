import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { CircularProgress, Grid } from '@material-ui/core';

const styles = {
  progress: {
    color: 'rgba(64,192,240)',
  },
};

const CustomProgress = props => {
  const { classes, loading, width, height } = props;

  return (
    <React.Fragment>
      {loading && (
        <Grid
          container
          align="center"
          justify="center"
          style={{
            padding: '5%',
            overflow: 'hidden',
          }}
        >
          <Grid item>
            <CircularProgress
              className={classes.progress}
              color="primary"
              style={{ width: width || '15vh', height: height || '15vh' }}
              thickness={2}
            />
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default withStyles(styles)(CustomProgress);
