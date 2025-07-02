import "./LogAppPage.scss";
import "theme/styles/components/DefaultPageStyle.scss";
import GenericTable from "components/common/table/GenericTable";
import { Grid } from "@material-ui/core";
import useLogApp from "./useLogApp";

const LogAppPage = () => {
  const {
    data,
    loading,
    filters,
  } = useLogApp();

  return (
    <>
      <Grid className="grid">
        <Grid className="gridTable">
          <GenericTable
            showArrowButton={false}
            showAddButton={false}
            data={data}
            loading={loading}
            tableTitle="Logs"
            filters={filters}
            containsCheck={false}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default LogAppPage;
