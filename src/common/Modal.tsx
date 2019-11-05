import React, {
  FC,
  ReactChild,
  ReactChildren,
  useLayoutEffect,
  useRef
} from "react";
import $ from "jquery";

interface Props {
  children: ReactChild | ReactChildren | false | undefined;
  onOk?: () => void;
  onCancel?: () => void;
  buttonText: string;
  header: string;
  open: boolean;
  okEnabled?: boolean;
}

export const Modal: FC<Props> = ({
  children,
  onOk,
  okEnabled,
  onCancel,
  buttonText,
  header,
  open
}: Props) => {
  const modalElementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    $(modalElementRef.current!)
      .modal("hide")
      .on("hide.bs.modal", () => {
        onCancel && onCancel();
      });
  }, []);

  useLayoutEffect(() => {
    console.log("effect after open", open);
    $(modalElementRef.current!).modal(open ? "show" : "hide");
  }, [open]);

  const ok = (): void => {
    $(modalElementRef.current!).modal("hide");
    onOk && onOk();
  };

  return (
    <div
      ref={modalElementRef}
      className="modal fade"
      id="exampleModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {header}
            </h5>
            <button type="button" className="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            {onOk && (
              <button
                onClick={ok}
                disabled={okEnabled !== undefined && !okEnabled}
                type="button"
                className="btn btn-primary"
              >
                {buttonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
