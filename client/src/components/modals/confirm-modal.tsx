import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
} from '@mui/material';

export interface ConfirmModalProps {
   title?: string;
   message?: string;
   open?: boolean;
   onOk: () => void;
   onCancel: () => void;
   onClose: () => void;
}

export function ConfirmModal({
   open = false,
   onOk,
   onCancel,
   onClose,
   title = 'Xác nhận',
   message = 'Bạn có chắc muốn thực hiện hành động này?',
}: ConfirmModalProps) {
   return (
      <Dialog
         open={open}
         onClose={onClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
      >
         <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
         <DialogContent>
            <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button onClick={onCancel}>Huỷ bỏ</Button>
            <Button onClick={onOk} autoFocus>
               Đồng ý
            </Button>
         </DialogActions>
      </Dialog>
   );
}
