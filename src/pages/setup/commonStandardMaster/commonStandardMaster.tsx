import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Autocomplete,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper, Checkbox,
  TablePagination
} from '@mui/material';
import Notification from '../../../components/Notification';
import { useMasterData } from '../../../services/hooks/masterData/masterData';
import { useNotification } from '../../../services/hooks/notification/notification';
import FilterSection from '../../../components/fiterSearch';
import ActionBar from '../../../components/actionBar';
import { useAcademicTitles } from '../../../services/hooks/academicTitle/academicTitle';
import { usePrograms } from '@/services/hooks';
import { usePriceCategories } from '../../../services/hooks/priceCategories/priceCategoties';
import { useEquipmentStatuses } from '../../../services/hooks/equipmentStatuses/equipmentStatuses';
import { useEquipmentForms } from '../../../services/hooks/equipmentForms/equipmentForms';
import { useFaculties } from '../../../services/hooks/faculties/faculties';
import { useLabPositions } from '../../../services/hooks/labPositions/labPositions';
import { useFunctionalDomains } from '../../../services/hooks/functionalDomains/functionalDomains';

import LoadingInline from '../../../components/loadingPopup';
import { useDeleteEquipmentForms } from '../../../services/hooks/equipmentForms/eqipmentFormsDelete';
import DynamicDialog from '../../../components/dynamicDialog';
import { useDeleteAcademicTitles } from '../../../services/hooks/academicTitle/academicTitlesDelete';
import { useDeleteEquipmentStatuses } from '../../../services/hooks/equipmentStatuses/equipmentStatusesDelete';
import { useDeleteFunctionalDomains } from '../../../services/hooks/functionalDomains/functionalDomainsDelete';
import { useDeleteFaculties } from '../../../services/hooks/faculties/facultiesDelete';
import { useDeleteLabPositions } from '../../../services/hooks/labPositions/labPositionsDelete';
import { useDeletePriceCategories } from '../../../services/hooks/priceCategories/priceCategotiesDelete';
import { useDeletePrograms } from '@/services/hooks/programsCSM/programsDelete';
import { useDeleteFunctionalCategories } from '../../../services/hooks/functionalCategories/functionalCategoriesDelete';
import AddFormDialog from '../../../components/AddFormDialog';
import { useAddFaculty } from '../../../services/hooks/faculties/facultiesAdd';
import { useAddAcademicTitle } from '../../../services/hooks/academicTitle/academicTitleAdd';
import { useAddEquipmentForm } from '@/services/hooks/equipmentForms/equipmentFormsAdd';
import { useAddFunctionalCategories } from '../../../services/hooks/functionalCategories/functionalCategoriesAdd';
import { useAddFunctionalDomains } from '../../../services/hooks/functionalDomains/functionalDomainsAdd';
import { useAddPrograms } from '@/services/hooks/programsCSM/programsAdd';
import { useFunctionalCategories } from '@/services/hooks/functionalCategories/functionalCategories';
import { data } from 'react-router-dom';
import CustomTablePagination from '@/components/CustomTablePagination';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ImportDialog from '@/components/ImportDialog';

export default function CommonStandardMaster() {
  const [searchParams, setSearchParams] = useState<Record<string, any>>({});
  const [searchKeywordParams, setSearchKeywworParams] = useState<Record<string, any>>({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { masterData, loading, error } = useMasterData();
  const [selected, setSelected] = React.useState('');
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const filterRef = useRef<{ reset: () => void }>(null);
  const [openImport, setOpenImport] = useState(false);

  const { academicTitles, loadingAcademicTitles, errorAcademicTitles } = useAcademicTitles(searchParams);
  const { programs, loadingPrograms, errorPrograms } = usePrograms(searchKeywordParams);
  const { priceCategories, loadingPriceCategories, errorPriceCategories } = usePriceCategories(searchParams);
  const { equipmentStatuses, loadingEquipmentStatuses, errorEquipmentStatuses } = useEquipmentStatuses(searchParams);
  const { forms, loadingForms, errorForms } = useEquipmentForms(searchParams);
  const { faculties, loadingFaculties, errorFaculties } = useFaculties(searchParams);
  const { labPositions, loadingLabPositions, errorLabPositions } = useLabPositions(searchParams);
  const { functionalDomains, loadingFunctionalDomains, errorFunctionalDomains } = useFunctionalDomains(searchParams);
  const { functionalCategories, loadingFunctionalCategories, errorFunctionalCategories } = useFunctionalCategories(searchParams);

  const { deleteEquipmentForms, loadingDeleteForms, errorDeleteForms, deletedFormIds } = useDeleteEquipmentForms();
  const { deleteAcademicTitles, loadingDeleteAcademicTitles, errorDeleteAcademicTitles, deletedAcademicTitleIds } = useDeleteAcademicTitles();
  const { deleteEquipmentStatuses, loadingDeleteEquipmentStatuses, errorDeleteEquipmentStatuses, deletedEquipmentStatusesIds } = useDeleteEquipmentStatuses();
  const { deleteFunctionalDomains, loadingDeleteFunctionalDomains, errorDeleteFunctionalDomains, deletedFunctionalDomainsIds } = useDeleteFunctionalDomains();
  const { deleteFaculties, loadingDeleteFaculties, errorDeleteFaculties, deletedFacultiesIds } = useDeleteFaculties();
  const { deleteLabPositions, loadingDeleteLabPositions, errorDeleteLabPositions, deletedLabPositionsIds } = useDeleteLabPositions();
  const { deletePriceCategories, loadingDeletePriceCategories, errorDeletePriceCategories, deletedPriceCategoriesIds } = useDeletePriceCategories();
  const { deletePrograms, loadingDeletePrograms, errorDeletePrograms, deletedProgramsIds } = useDeletePrograms();
  const { deleteFunctionalCategories, loadingDeleteFunctionalCategories, errorDeleteFunctionalCategories, deletedFunctionalCategoriesIds } = useDeleteFunctionalCategories();

  const { addFaculty, loadingAddFaculty, errorAddFaculty } = useAddFaculty();
  const { addAcademicTitle, loadingAddAcademicTitle, errorAddAcademicTitle } = useAddAcademicTitle();
  const { addEquipmentForm, loadingAddForm, errorAddForm, isAddedSuccessfully } = useAddEquipmentForm();
  const { addFunctionalCategories, loadingAddFunctionalCategories, errorAddFunctionalCategories } = useAddFunctionalCategories();
  const { addFunctionalDomains, loadingAddFunctionalDomains, errorAddFunctionalDomains } = useAddFunctionalDomains();
  const { addPrograms, loadingAddPrograms, errorAddPrograms } = useAddPrograms();
  const { notify, showSuccess, showError, showInfo, showWarning, close } = useNotification();

  useEffect(() => {
    const error = errorAcademicTitles || errorPrograms || errorPriceCategories || errorEquipmentStatuses || errorForms || errorFaculties || errorLabPositions || errorFunctionalDomains || errorFunctionalCategories || errorDeleteAcademicTitles || errorDeleteForms || errorDeleteEquipmentStatuses
      || errorDeleteEquipmentStatuses || errorDeleteFunctionalCategories || errorDeleteFunctionalDomains || errorDeleteFaculties || errorDeleteLabPositions || errorDeletePriceCategories || errorDeletePrograms || errorAddFaculty || errorAddAcademicTitle || errorAddForm || errorAddFunctionalCategories
      || errorAddFunctionalDomains || errorAddPrograms;
    if (error?.message) {
      showError(error.message);
      const timer = setTimeout(() => close(), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorAcademicTitles, errorPrograms, errorPriceCategories, errorEquipmentStatuses, errorForms, errorFaculties, errorLabPositions, errorFunctionalDomains, errorFunctionalCategories, errorDeleteAcademicTitles, errorDeleteForms, errorDeleteEquipmentStatuses,
    errorDeleteEquipmentStatuses, errorDeleteFunctionalDomains, errorDeleteFaculties, errorDeleteLabPositions, errorDeletePriceCategories, errorDeletePrograms, errorDeleteFunctionalCategories, errorAddAcademicTitle, errorAddForm, errorAddFunctionalDomains, errorAddFunctionalCategories,
    errorAddPrograms
  ]);

  const isLoading =
    loadingAcademicTitles ||
    loadingPrograms ||
    loadingPriceCategories ||
    loadingEquipmentStatuses ||
    loadingFunctionalCategories ||
    loadingFunctionalDomains ||
    loadingLabPositions ||
    loadingFaculties ||
    loadingForms ||
    loadingDeleteAcademicTitles ||
    loadingDeleteForms ||
    loadingDeleteEquipmentStatuses ||
    loadingDeleteFunctionalDomains
    loadingDeleteFaculties ||
    loadingDeletePrograms ||
    loadingDeleteLabPositions ||
    loadingDeletePriceCategories ||
    loadingAddAcademicTitle ||
    loadingAddFaculty ||
    loadingDeleteFunctionalCategories ||
    loadingAddForm ||
    loadingAddFunctionalCategories ||
    loadingAddFunctionalDomains ||
    loadingAddPrograms
    ;

  const selectedItem = useMemo(() => {
    if (!selected) return [];
    const dataMap: Record<string, any> = {
      "academic-titles": academicTitles || [],
      "programs": programs || [],
      "price-categories": priceCategories || [],
      "equipment-statuses": equipmentStatuses || [],
      "functional-categories": functionalCategories || [],
      "functional-domains": functionalDomains || [],
      "lab-positions": labPositions || [],
      "faculty": faculties || [],
      "forms": forms || [],
    };
    const rawData = dataMap[selected];
    if (Array.isArray(rawData)) {
      return rawData;
    }
    if (rawData && Array.isArray(rawData.data)) {
      return rawData.data;
    }
    return [];
  }, [selected, academicTitles, programs, priceCategories, forms, equipmentStatuses, functionalCategories, functionalDomains, labPositions, faculties]);

  const items = selectedItem;
  const keys = items.length > 0
    ? Object.keys(items[0]).filter(k => k !== "faculty" && k !== "id")
    : [];

  const handleFilter = (filters: any) => {
    const keyword = filters.search?.trim();

    if (!keyword) {
      setSearchParams({ _refresh: Date.now() });
      return;
    }

    let apiParams: Record<string, any> = {};
    switch (selected) {
      case "programs":
        apiParams = { searchKeyword: keyword };
        setSearchKeywworParams(prev => {
          if (JSON.stringify(prev) === JSON.stringify(apiParams)) {
            return prev;
          }
          return apiParams;
        });
        break;
      default:
        apiParams = { search: keyword };
        setSearchParams(prev => {
          if (JSON.stringify(prev) === JSON.stringify(apiParams)) {
            return prev;
          }
          return apiParams;
        });
    }
  };
  const handleChangeSelected = (value: string) => {
    setSelected(value);
    filterRef.current?.reset();
    setSearchParams({ _refresh: Date.now() });
  };

  const checkDelete = (ids: number[]) => {
    if (!ids || ids.length === 0) {
      showError("Please select the row to delete");
      return;
    }
    setOpenConfirm(true);
  };


  const handleConfirmDelete = async () => {
    if (selected === "") {
      showError("Please select master data type");
    }


    const varTextSuccess = "Deleted successfully";
    if (selected === "forms" && selectedIds.length > 0) {
      await deleteEquipmentForms(selectedIds);


      setSearchParams({ _refresh: Date.now() });
      setSelectedIds([]);
      setOpenConfirm(false);
      showSuccess(varTextSuccess);


    }
    if (selected === "academic-titles" && selectedIds.length > 0) {
      await deleteAcademicTitles(selectedIds);

      setSearchParams({ _refresh: Date.now() });
      setSelectedIds([]);
      setOpenConfirm(false);
      showSuccess(varTextSuccess);


    }
    if (selected === "functional-categories" && selectedIds.length > 0) {
      await deleteFunctionalCategories(selectedIds);

      setSearchParams({ _refresh: Date.now() });
      setSelectedIds([]);
      setOpenConfirm(false);
      showSuccess(varTextSuccess);

    }
    if (selected === "functional-domains" && selectedIds.length > 0) {
      await deleteFunctionalDomains(selectedIds);


      setSearchParams({ _refresh: Date.now() });
      setSelectedIds([]);
      setOpenConfirm(false);
      showSuccess(varTextSuccess);

    }
    if (selected === "lab-prositions" && selectedIds.length > 0) {
      await deleteLabPositions(selectedIds);


      setSearchParams({ _refresh: Date.now() });
      setSelectedIds([]);
      setOpenConfirm(false);
      showSuccess(varTextSuccess);

    }
    if (selected === "programs" && selectedIds.length > 0) {
      await deletePrograms(selectedIds);


      setSearchParams({ _refresh: Date.now() });
      setSelectedIds([]);
      setOpenConfirm(false);
      showSuccess(varTextSuccess);

    }
    if (selected === "faculty" && selectedIds.length > 0) {
      await deleteFaculties(selectedIds);


      setSearchParams({ _refresh: Date.now() });
      setSelectedIds([]);
      setOpenConfirm(false);
      showSuccess(varTextSuccess);

    }
    if (selected === "price-categories" && selectedIds.length > 0) {
      await deletePriceCategories(selectedIds);


      setSearchParams({ _refresh: Date.now() });
      setSelectedIds([]);
      setOpenConfirm(false);
      showSuccess(varTextSuccess);


    }
    setOpenConfirm(false);
  };
  const handleAdd = async (data: any) => {
    const hasValue = Object.values(data).some(v => v !== null && v !== undefined && v !== "");
    const varTextSuccess = "Save successfully";
    if (selected === "") {
      showError("Please select master-data type");
    }

    if (selected === "faculty" && hasValue === true) {
      await addFaculty(data);
      setSearchParams({ _refresh: Date.now() });
      setSelectedIds([]);
      setOpenConfirm(false);
      showSuccess(varTextSuccess);
    }
    if (selected === "academic-titles" && hasValue === true) {
      await addAcademicTitle(data);
      setSearchParams({ _refresh: Date.now() });
      setSelectedIds([]);
      setOpenConfirm(false);
    }
    if (selected === "forms" && hasValue === true) {
      await addEquipmentForm(data);
      setSearchParams({ _refresh: Date.now() });
      setSelectedIds([]);
      setOpenConfirm(false);
    }
    if (selected === "functional-categories" && hasValue === true) {
      await addFunctionalCategories(data);
      setSearchParams({ _refresh: Date.now() });
      setSelectedIds([]);
      setOpenConfirm(false);
    }
    if (selected === "functional-domains" && hasValue === true) {
      await addFunctionalDomains(data);
      setSearchParams({ _refresh: Date.now() });
      setSelectedIds([]);
      setOpenConfirm(false);
    }
    if (selected === "programs" && hasValue === true) {
      await addPrograms(data);
      setSearchParams({ _refresh: Date.now() });
      setSelectedIds([]);
      setOpenConfirm(false);
    }
    setSearchParams({ _refresh: Date.now() });
    setOpenAdd(false);
  };

  const handleExportExcel = () => {
    if (!items || items.length === 0) {
      showError("No data to export");
      return;
    }

    const currentPageData = items
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row: { [x: string]: any; }) => {
        const obj: Record<string, any> = {};
        keys.forEach((key) => {
          obj[key.toUpperCase()] = row[key];
        });
        return obj;
      });

    const worksheet = XLSX.utils.json_to_sheet(currentPageData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${selected || "Data"}_${new Date().toISOString().slice(0, 10)}.xlsx`);

    showSuccess("Exported successfully!");
  };


  const handleImport = async (data: any[]) => {
    try {
      if (!data || data.length === 0) {
        showError("No data to import");
        return;
      }

      if (!selected) {
        showError("Please select master-data type");
        return;
      }

      const varTextSuccess = "Imported successfully";

      for (const row of data) {
        const hasValue = Object.values(row).some(
          (v) => v !== null && v !== undefined && String(v).trim() !== ""
        );
        if (!hasValue) continue;

        if (selected === "faculty") {
          await addFaculty(row);
        } else if (selected === "academic-titles") {
          await addAcademicTitle(row);
        } else if (selected === "forms") {
          await addEquipmentForm(row);
        } else if (selected === "functional-categories") {
          await addFunctionalCategories(row);
        } else if (selected === "functional-domains") {
          await addFunctionalDomains(row);
        } else if (selected === "programs") {
          await addPrograms(row);
        } else {
          showError(`Import not supported for "${selected}"`);
          return;
        }
      }

      showSuccess(varTextSuccess);
      setSearchParams({ _refresh: Date.now() });
      setSelectedIds([]);
      setOpenImport(false);
    } catch (error: any) {
      console.error("Import error:", error);
      showError(`Import failed: ${error?.message || "Unknown error"}`);
    }
  };

  
  return (
    <Box sx={{ p: 2 }}>
      <LoadingInline open={isLoading} />
      <Autocomplete
        disabled={loading || !!error}
        options={
          masterData?.flatMap((group) =>
            group.items.map((item) => ({
              label: item.name,
              value: item.code,
              group: group.name,
              basePath: item.basePath
            }))
          ) || []
        }
        groupBy={(option) => option.group}
        getOptionLabel={(option) => option.label}
        onChange={(event, newValue) => {
          const selectedValue = newValue?.basePath || '';
          setSelected(selectedValue);
          handleChangeSelected(selectedValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter char to auto search"
            error={!!error}
            helperText={error ? 'Cannot download list' : ''}
          />
        )}
      />
      {selected ? (
        <Box mt={2}>
          <TablePagination
            component="div"
            count={items.length}
            page={page}
            onPageChange={(event: any, newPage: React.SetStateAction<number>) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(event: { target: { value: string; }; }) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
          
          <ActionBar
            type={selected}
            selectedIds={selectedIds}
            onDelete={checkDelete}
            onAdd={() => setOpenAdd(true)}
            onImport={() => setOpenImport(true)} 
            onExport={handleExportExcel}
            handleFilter={handleFilter} 
          />
            
          <TableContainer component={Paper}>
            <Table size="small" sx={{ borderCollapse: "collapse", "& td, & th": { border: "1px solid rgba(224, 224, 224, 1)" } }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    padding="checkbox"
                    sx={{
                      background: "#f0f0f0",
                      padding: "8px",
                    }}
                  >
                    <Checkbox
                      indeterminate={
                        selectedIds.length > 0 && selectedIds.length < items.length
                      }
                      checked={
                        items.length > 0 && selectedIds.length === items.length
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedIds(items.map((item: any) => item.id));
                        } else {
                          setSelectedIds([]);
                        }
                      }}
                    />
                  </TableCell>

                  {keys.map((key) => (
                    <TableCell
                      key={key}
                      sx={{
                        textAlign: "left",
                        padding: "8px",
                        background: "#f0f0f0",
                      }}
                    >
                      <b>{key.toUpperCase()}</b>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {items
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: { [x: string]: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; id: number; }, rowIndex: React.Key | null | undefined) => {
                    const isSelected = selectedIds.includes(row.id);
                    return (
                      <TableRow key={rowIndex}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected}
                            onChange={() => {
                              if (isSelected) {
                                setSelectedIds(selectedIds.filter(id => id !== row.id));
                              } else {
                                setSelectedIds([...selectedIds, row.id]);
                              }
                            }}
                          />
                        </TableCell>
                        {keys.map((key) => (
                          <TableCell key={key}>{row[key]}</TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box mt={2} textAlign="center" color="gray">
          No data to display
        </Box>
      )}
      <Notification
        open={notify.open}
        message={notify.message}
        severity={notify.severity}
        onClose={close}
      />
      <DynamicDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Confirmation"
        content="Are you sure you want to delete the selected items? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmColor="error"
      />
      <AddFormDialog
        type={selected}
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSave={handleAdd}
        faculty={faculties?.data|| []}
      />
      <ImportDialog
        open={openImport}
        onClose={() => setOpenImport(false)}
        keys={keys}
        onImport={handleImport}
      />
    </Box>
  );
}