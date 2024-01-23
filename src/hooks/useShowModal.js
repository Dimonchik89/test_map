import { useState, useCallback } from "react";

const useShowModal = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = useCallback(
        () => setOpen(true), 
        []
    );

    const handleClose = useCallback(
        () => setOpen(false), 
        []
    );

    return { open, handleOpen, handleClose }
}

export { useShowModal }