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
import { useProgramsCSM } from '../../../services/hooks/programsCSM/programsCSM';
import { usePriceCategories } from '../../../services/hooks/priceCategories/priceCategoties';
import { useEquipmentStatuses } from '../../../services/hooks/equipmentStatuses/equipmentStatuses';
import { useEquipmentForms } from '../../../services/hooks/equipmentForms/equipmentForms';
import { useFaculties } from '../../../services/hooks/faculties/faculties';
import { useLabPositions } from '../../../services/hooks/labPositions/labPositions';
import { useFunctionalDomains } from '../../../services/hooks/functionalDomains/functionalDomains';
import { useFunctionalCategories } from '../../../services/hooks/functionalCategories/functionalCategories ';
import LoadingInline from '../../../components/loadingPopup';
import { useDeleteEquipmentForms } from '../../../services/hooks/equipmentForms/eqipmentFormsDelete';
import DynamicDialog from '../../../components/dynamicDialog';
import { useDeleteAcademicTitles } from '../../../services/hooks/academicTitle/academicTitlesDelete';
import { useDeleteEquipmentStatuses } from '../../../services/hooks/equipmentStatuses/equipmentStatusesDelete';
import { useDeleteFunctionalDomains } from '../../../services/hooks/functionalDomains/functionalDomainsDelete';
import { useDeleteFaculties } from '../../../services/hooks/faculties/facultiesDelete';
import { useDeleteLabPositions } from '../../../services/hooks/labPositions/labPositionsDelete';
import { useDeletePriceCategories } from '../../../services/hooks/priceCategories/priceCategotiesDelete';
import { useDeletePrograms } from '../../../services/hooks/programsCSM/programsDelete';
import { useDeleteFunctionalCategories } from '../../../services/hooks/functionalCategories/functionalCategoriesDelete';
import AddFormDialog from '../../../components/AddFormDialog';
import { useAddFaculty } from '../../../services/hooks/faculties/facultiesAdd';
import { useAddAcademicTitle } from '../../../services/hooks/academicTitle/academicTitleAdd';
import { useAddEquipmentForms } from '../../../services/hooks/equipmentForms/equipmentFormsAdd';
import { useAddFunctionalCategories } from '../../../services/hooks/functionalCategories/functionalCategoriesAdd';
import { useAddFunctionalDomains } from '../../../services/hooks/functionalDomains/functionalDomainsAdd';
export default function CommonStandardMaster() {
  //--------------------------------------------------------------------------------------------------------- Khai báo 

  const [searchParams, setSearchParams] = useState<Record<string, any>>({});
  const [searchKeywordParams, setSearchKeywworParams] = useState<Record<string, any>>({});
  const [page, setPage] = useState(0); // Trang hiện tại (0 là trang đầu)
  const [rowsPerPage, setRowsPerPage] = useState(10); // Số dòng mỗi trang
  const { masterData, loading, error } = useMasterData();
  const [selected, setSelected] = React.useState('');
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const filterRef = useRef<{ reset: () => void }>(null);

  //--------------------------------------------------------------------------------------------------------- Gọi custom hook và destructuring kết quả trả về cho master-data


  const { academicTitles, loadingAcademicTitles, errorAcademicTitles } = useAcademicTitles(searchParams);
  const { programsCSM, loadingProgramsCSM, errorProgramsCSM } = useProgramsCSM(searchKeywordParams);
  const { priceCategories, loadingPriceCategories, errorPriceCategories } = usePriceCategories(searchParams);
  const { equipmentStatuses, loadingEquipmentStatuses, errorEquipmentStatuses } = useEquipmentStatuses(searchParams);
  const { equipmentForms, loadingEquipmentForms, errorEquipmentForms } = useEquipmentForms(searchParams);
  const { faculties, loadingFaculties, errorFaculties } = useFaculties(searchParams);
  const { labPositions, loadingLabPositions, errorLabPositions } = useLabPositions(searchParams);
  const { functionalDomains, loadingFunctionalDomains, errorFunctionalDomains } = useFunctionalDomains(searchParams);
  const { functionalCategories, loadingFunctionalCategories, errorFunctionalCategories } = useFunctionalCategories(searchParams);


    //--------------------------------------------------------------------------------------------------------- Gọi custom hook và destructuring kết quả trả về cho xóa data

  const { deleteEquipmentForms, loadingDeleteEquipmentForms, errorDeleteEquipmentForms, deletedEquipmentFormsIds } = useDeleteEquipmentForms();
  const { deleteAcademicTitles, loadingDeleteAcademicTitles, errorDeleteAcademicTitles, deletedAcademicTitlesIds } = useDeleteAcademicTitles();
  const { deleteEquipmentStatuses, loadingDeleteEquipmentStatuses, errorDeleteEquipmentStatuses, deletedEquipmentStatusesIds } = useDeleteEquipmentStatuses();
  const { deleteFunctionalDomains, loadingDeleteFunctionalDomains, errorDeleteFunctionalDomains, deletedFunctionalDomainsIds } = useDeleteFunctionalDomains();
  const { deleteFaculties, loadingDeleteFaculties, errorDeleteFaculties, deletedFacultiesIds } = useDeleteFaculties();
  const { deleteLabPositions, loadingDeleteLabPositions, errorDeleteLabPositions, deletedLabPositionsIds } = useDeleteLabPositions();
  const { deletePriceCategories, loadingDeletePriceCategories, errorDeletePriceCategories, deletedPriceCategoriesIds} = useDeletePriceCategories();
  const { deletePrograms, loadingDeletePrograms, errorDeletePrograms, deletedProgramsIds } = useDeletePrograms();
  const { deleteFunctionalCategories, loadingDeleteFunctionalCategories, errorDeleteFunctionalCategories, deletedFunctionalCategoriesIds } = useDeleteFunctionalCategories();

    //--------------------------------------------------------------------------------------------------------- Gọi custom hook và destructuring kết quả trả về cho thêm data

  const { addFaculty, loadingAddFaculty, errorAddFaculty } = useAddFaculty();
  const { addAcademicTitle, loadingAddAcademicTitle, errorAddAcademicTitle } = useAddAcademicTitle();
  const { addEquipmentForm, loadingAddEquipmentForm, errorAddEquipmentForm } = useAddEquipmentForms();
  const { addFunctionalCategories, loadingAddFunctionalCategories, errorAddFunctionalCategories } = useAddFunctionalCategories();
  const { addFunctionalDomains, loadingAddFunctionalDomains, errorAddFunctionalDomains } = useAddFunctionalDomains();
  const { notify, showSuccess, showError, showInfo, showWarning, close } = useNotification();
 

  //--------------------------------------------------------------------------------------------------------- Hiển thị thông báo khi có lỗi tải dữ liệu

  useEffect(() => {
    const error = errorAcademicTitles || errorProgramsCSM || errorPriceCategories || errorEquipmentStatuses || errorEquipmentForms || errorFaculties || errorLabPositions || errorFunctionalDomains || errorFunctionalCategories || errorDeleteAcademicTitles || errorDeleteEquipmentForms || errorDeleteEquipmentStatuses
      || errorDeleteEquipmentStatuses || errorDeleteFunctionalCategories || errorDeleteFunctionalDomains || errorDeleteFaculties || errorDeleteLabPositions || errorDeletePriceCategories || errorDeletePrograms || errorAddFaculty || errorAddAcademicTitle || errorAddEquipmentForm || errorAddFunctionalCategories
    errorAddFunctionalDomains;
    if (error?.message) {
      showError(error.message);
      const timer = setTimeout(() => close(), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorAcademicTitles, errorProgramsCSM, errorPriceCategories, errorEquipmentStatuses, errorEquipmentForms, errorFaculties, errorLabPositions, errorFunctionalDomains, errorFunctionalCategories, errorDeleteAcademicTitles, errorDeleteEquipmentForms, errorDeleteEquipmentStatuses,
    errorDeleteEquipmentStatuses, errorDeleteFunctionalDomains, errorDeleteFaculties, errorDeleteLabPositions, errorDeletePriceCategories, errorDeletePrograms, errorDeleteFunctionalCategories, errorAddAcademicTitle, errorAddEquipmentForm, errorAddFunctionalDomains, errorAddFunctionalCategories
  ]);


  //--------------------------------------------------------------------------------------------------------- Tạo hành động loading 

  const isLoading =
    loadingAcademicTitles ||
    loadingProgramsCSM ||
    loadingPriceCategories ||
    loadingEquipmentStatuses ||
    loadingFunctionalCategories ||
    loadingFunctionalDomains ||
    loadingLabPositions ||
    loadingFaculties ||
    loadingEquipmentForms ||
    loadingDeleteAcademicTitles ||
    loadingDeleteEquipmentForms ||
    loadingDeleteEquipmentStatuses ||
    loadingDeleteFunctionalDomains
    loadingDeleteFaculties ||
    loadingDeletePrograms ||
    loadingDeleteLabPositions ||
    loadingDeletePriceCategories ||
    loadingAddAcademicTitle ||
    loadingAddFaculty ||
    loadingDeleteFunctionalCategories ||
    loadingAddEquipmentForm ||
    loadingAddFunctionalCategories ||
    loadingAddFunctionalDomains
    ;

  //--------------------------------------------------------------------------------------------------------- Gọi master-data cho dropdown select chính

  const selectedItem = useMemo(() => {
    if (!selected) return [];
    const dataMap: Record<string, any> = {
      "academic-titles": academicTitles || [],
      "programs": programsCSM || [],
      "price-categories": priceCategories || [],
      "equipment-statuses": equipmentStatuses || [],
      "functional-categories": functionalCategories || [],
      "functional-domains": functionalDomains || [],
      "lab-positions": labPositions || [],
      "faculty": faculties || [],
      "forms": equipmentForms || [],
    };
    const rawData = dataMap[selected];
    // Trường hợp API trả về mảng trực tiếp
    if (Array.isArray(rawData)) {
      return rawData;
    }
    // Trường hợp API trả về object có key data là mảng
    if (rawData && Array.isArray(rawData.data)) {
      return rawData.data;
    }
    return [];
  }, [selected, academicTitles, programsCSM, priceCategories, equipmentForms, equipmentStatuses, functionalCategories, functionalDomains, labPositions, faculties]);

  //--------------------------------------------------------------------------------------------------------- Xử lý dữ liệu master-data đã tải

  const items = selectedItem;
  const keys = items.length > 0
    ? Object.keys(items[0]).filter(k => k !== "faculty" && k !== "id")
    : [];
  const handleFilter = (filters: any) => {
    const keyword = filters.search?.trim();

    // Nếu rỗng -> clear kết quả hoặc giữ nguyên state, tùy ý
    if (!keyword) {
      // Ví dụ: clear dữ liệu
      setSearchParams({ _refresh: Date.now() });
      return;
    }

    let apiParams: Record<string, any> = {};
    switch (selected) {
      case "programs":
        apiParams = { searchKeyword: keyword };
        setSearchKeywworParams(prev => {
          if (JSON.stringify(prev) === JSON.stringify(apiParams)) {
            return prev; // Không thay đổi -> không gọi lại API
          }
          return apiParams;
        });
        break;
      default:
        apiParams = { search: keyword };
        setSearchParams(prev => {
          if (JSON.stringify(prev) === JSON.stringify(apiParams)) {
            return prev; // Không thay đổi -> không gọi lại API
          }
          return apiParams;
        });
    }

    //--------------------------------------------------------------------------------------------------------- Xử lý sự kiện change select

  };
  const handleChangeSelected = (value: string) => {
    setSelected(value);
    filterRef.current?.reset(); // Gọi reset ở FilterSection
    setSearchParams({ _refresh: Date.now() });
  };

  //--------------------------------------------------------------------------------------------------------- Xử lý sự kiện xác nhận xóa
  const handleConfirmDelete = async () => {
    const varTextSuccess = "Deleted successfully";
    if (selected === "forms" && selectedIds.length > 0) {
      await deleteEquipmentForms(selectedIds);
      if(deletedEquipmentFormsIds.length >0)
      {
        
        setSearchParams({ _refresh: Date.now() });
        setSelectedIds([]);
        setOpenConfirm(false);
        showSuccess(varTextSuccess);
      }
      
    }
    if (selected === "academic-titles" && selectedIds.length > 0) {
      await deleteAcademicTitles(selectedIds);
      if(deletedAcademicTitlesIds.length >0)
      {
        setSearchParams({ _refresh: Date.now() });
        setSelectedIds([]);
        setOpenConfirm(false);
        showSuccess(varTextSuccess);
      }
      
    }
    if (selected === "functional-categories" && selectedIds.length > 0) {
      await deleteFunctionalCategories(selectedIds);
      if(deletedFunctionalCategoriesIds.length >0)
      {
        setSearchParams({ _refresh: Date.now() });
        setSelectedIds([]);
        setOpenConfirm(false);
        showSuccess(varTextSuccess);
      }
    }
    // if (selected === "equipment-statuses" && selectedIds.length > 0) {
    //   if(deletedEquipmentStatusesIds.length >0)
    //   {
    //     await deleteEquipmentStatuses(selectedIds);
    //     setSearchParams({ _refresh: Date.now() });
    //     setSelectedIds([]);
    //     setOpenConfirm(false);
    //     showSuccess(varTextSuccess);
    //   }
    // }
    if (selected === "functional-domains" && selectedIds.length > 0) {
      await deleteFunctionalDomains(selectedIds);
      if(deletedFunctionalDomainsIds.length >0)
      {
        
        setSearchParams({ _refresh: Date.now() });
        setSelectedIds([]);
        setOpenConfirm(false);
        showSuccess(varTextSuccess);
      }
    }
    if (selected === "lab-prositions" && selectedIds.length > 0) {
      await deleteLabPositions(selectedIds);
      if(deletedLabPositionsIds.length >0)
      {
        
        setSearchParams({ _refresh: Date.now() });
        setSelectedIds([]);
        setOpenConfirm(false);
        showSuccess(varTextSuccess);
      }
    }
    if (selected === "programs" && selectedIds.length > 0) {
      await deletePrograms(selectedIds);
      if(deletedProgramsIds.length >0)
      {
        
        setSearchParams({ _refresh: Date.now() });
        setSelectedIds([]);
        setOpenConfirm(false);
        showSuccess(varTextSuccess);
      }
    }
    if (selected === "faculty" && selectedIds.length > 0) {
      await deleteFaculties(selectedIds);
      if(deletedFacultiesIds.length >0)
      {
        
        setSearchParams({ _refresh: Date.now() });
        setSelectedIds([]);
        setOpenConfirm(false);
        showSuccess(varTextSuccess);
      }
    }
    if (selected === "price-categories" && selectedIds.length > 0) {
      await deletePriceCategories(selectedIds);
      if(deletedPriceCategoriesIds.length >0)
      {
        
        setSearchParams({ _refresh: Date.now() });
        setSelectedIds([]);
        setOpenConfirm(false);
        showSuccess(varTextSuccess);
      }
      
    }
    setOpenConfirm(false);
  };
  //--------------------------------------------------------------------------------------------------------- Xử lý sự kiện hiển thị popup form thêm và lưu

  const handleAdd = async (data: any) => {
    const hasValue = Object.values(data).some(v => v !== null && v !== undefined && v !== "");
    if (selected === "faculty" && hasValue === true) {
      await addFaculty(data);
      setSearchParams({ _refresh: Date.now() });
      setSelectedIds([]);
      setOpenConfirm(false);
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
    setSearchParams({ _refresh: Date.now() });
    setOpenAdd(false);
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Popup loading */}
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
      {selectedItem.length > 0 ? (
        <Box mt={2}>
          <FilterSection ref={filterRef} onSearch={handleFilter} />
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
            selectedIds={selectedIds}
            onDelete={() => setOpenConfirm(true)}
            onAdd={() => setOpenAdd(true)}
            onImport={(file) => {
            }}
            onExport={() => {
            }}
          />
          <TableContainer component={Paper}>
            <Table size="small" sx={{ borderCollapse: "collapse", "& td, & th": { border: "1px solid rgba(224, 224, 224, 1)" } }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    padding="checkbox"
                    sx={{
                      background: "#f0f0f0",
                      padding: "8px", // giữ đồng bộ với body
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
        type={selected}   // "forms" | "users" | "equipments"
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSave={handleAdd}
      />
    </Box>
  );
}
