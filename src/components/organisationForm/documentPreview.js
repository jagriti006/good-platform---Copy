import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Organisationapi from "../../api/organizationapi";
import Document from "../../assets/images/preview/documents.png";
import downloadIcon from "../../assets/images/preview/downalodImage1.png";

function DocumentPreview(props) {
  const [legal_documents, setlegal_documents] = useState("");
  const [financial_documents, setfinancial_documents] = useState("");
  const organisationId = useParams().organisationId;
  useEffect(() => {
    const fetchData = async () => {
      handleFinancialDocument();
      handleLegalDocument();
    };
    fetchData();
  }, []);

  const handleFinancialDocument = async () => {
    if (organisationId !== "") {
      const response = await Organisationapi().fetchDocument(organisationId);
      if (response.data) {
        setfinancial_documents(response.data);
      }
    }
  };

  const handleLegalDocument = async () => {
    if (organisationId !== "") {
      const response = await Organisationapi().fetchLegal(organisationId);
      if (response.data) {
        setlegal_documents(response.data);
      }
    }
  };

  return (
    <div id="document_preview">
      <div className="row divSpace">
        <img height="35" src={Document} />
        <h1 className="previewHeading">Documents</h1>
      </div>
      <div className="divSpace">
        <p className="userDetailName">History</p>
      </div>
      <div className="row col-sm-12">
        <div className="divSpace col-sm-4">
          <p className="previewLabel">IFSC Code</p>
          <p className="previewData">
            {financial_documents ? `${financial_documents.ifscCode || "-"}`.replace(/.(?=.{3})/g, "X") : ""}
          </p>
        </div>
        <div className="divSpace col-sm-4">
          <p className="previewLabel">Bank Account Number</p>
          <p className="previewData">
            {financial_documents ? `${financial_documents.accountNumber || "-"}`.replace(/.(?=.{3})/g, "X") : ""}
          </p>
        </div>
        <div className="divSpace col-sm-4">
          <p className="previewLabel">Branch Name</p>
          <p className="previewData">{financial_documents ? financial_documents.branchName : ""}</p>
        </div>
      </div>
      <div className="row col-sm-12 avout formStyles p-15 pt-3">
        <div className="col-md-12 col-sm-12 titleprev">
          <label class="alignleft">
            Uploaded Cancelled Cheque
            {financial_documents.cancelledChequeUrl != null && (
              <a href={financial_documents ? financial_documents.cancelledChequeUrl : ""} target="_blank">
                <img src={downloadIcon} alt="" />
              </a>
            )}
          </label>
          <span style={{ fontSize: 12, maxWidth: 280 }} className="d-inline-block text-truncate">
            {financial_documents?.cancelledChequeFilename}
          </span>
        </div>
      </div>
      <div className="row col-sm-12 avout formStyles p-15 pt-3">
        <div className="col-md-12 col-sm-12 titleprev">
          <label class="alignleft">
            Company PAN card
            {financial_documents.companyPanCardUrl != null && (
              <a href={financial_documents ? financial_documents.companyPanCardUrl : ""} target="_blank">
                <img src={downloadIcon} alt="" />
              </a>
            )}
          </label>
          <span style={{ fontSize: 12, maxWidth: 280 }} className="d-inline-block text-truncate">
            {financial_documents?.companyPanCardFilename}
          </span>
        </div>
      </div>
      {financial_documents.lastAuditedStatements &&
        financial_documents.lastAuditedStatements.map((auditstatement) => {
          return (
            auditstatement &&
            auditstatement.id != null && (
              <div>
                <div className="row col-sm-12 avout formStyles p-15 pt-3">
                  <div className="col-md-12 col-sm-12 titleprev">
                    <label class="alignleft">
                      Last Audited Statement
                      {auditstatement.auditedStatementUrl != null && (
                        <a href={auditstatement.auditedStatementUrl} target="_blank">
                          <img src={downloadIcon} alt="" />
                        </a>
                      )}
                    </label>
                    <span style={{ fontSize: 12, maxWidth: 280 }} className="d-inline-block text-truncate">
                      {auditstatement?.auditedStatementFileName}
                    </span>
                  </div>
                </div>
                <div className="row col-sm-12">
                  <div className="divSpace col-sm-6">
                    <p className="previewLabel">Financial Year</p>
                    <p className="previewData">{auditstatement.auditedYear ? auditstatement.auditedYear : ""}</p>
                  </div>
                  <div className="divSpace col-sm-6">
                    <p className="previewLabel">Auditor</p>
                    <p className="previewData">{auditstatement.auditor ? auditstatement.auditor : ""}</p>
                  </div>
                </div>
              </div>
            )
          );
        })}
      <div className="divSpace">
        <p className="userDetailName">Legal</p>
      </div>

      <div className="row col-sm-12 avout formStyles p-15 pt-3">
        <div className="col-md-12 col-sm-12 titleprev">
          <label class="alignleft">
            Certificate of Incorporation
            {legal_documents.certificateOfIncorporationUrl != null && (
              <a href={legal_documents ? legal_documents.certificateOfIncorporationUrl : ""} target="_blank">
                <img src={downloadIcon} alt="" />
              </a>
            )}
          </label>
          <span style={{ fontSize: 12, maxWidth: 280 }} className="d-inline-block text-truncate">
            {legal_documents?.certificateOfIncorporationFilename}
          </span>
        </div>
      </div>
      <div className="row col-sm-12 avout formStyles p-15 pt-3">
        <div className="col-md-12 col-sm-12 titleprev">
          <label class="alignleft">
            FCRA Approval Letter
            {legal_documents.fcraApprovalLetter != null && (
              <a href={legal_documents ? legal_documents.fcraApprovalLetter : ""} target="_blank">
                <img src={downloadIcon} alt="" />
              </a>
            )}
          </label>
          <span style={{ fontSize: 12, maxWidth: 280 }} className="d-inline-block text-truncate">
            {legal_documents?.fcraApprovalLetterFilename}
          </span>
        </div>
      </div>
      <div className="row col-sm-12 avout formStyles p-15 pt-3">
        <div className="col-md-12 col-sm-12 titleprev">
          <label class="alignleft">
            Trust Deed
            {legal_documents.trustDeedUrl != null && (
              <a href={legal_documents ? legal_documents.trustDeedUrl : ""} target="_blank">
                <img src={downloadIcon} alt="" />
              </a>
            )}
          </label>
          <span style={{ fontSize: 12, maxWidth: 280 }} className="d-inline-block text-truncate">
            {legal_documents?.trustDeedFilename}
          </span>
        </div>
      </div>
      <div className="row col-sm-12 avout formStyles p-15 pt-3">
        <div className="col-md-12 col-sm-12 titleprev">
          <label class="alignleft">
            Memorandom of Association
            {legal_documents.memorandumOfAssociationUrl != null && (
              <a href={legal_documents ? legal_documents.memorandumOfAssociationUrl : ""} target="_blank">
                <img src={downloadIcon} alt="" />
              </a>
            )}
          </label>
          <span style={{ fontSize: 12, maxWidth: 280 }} className="d-inline-block text-truncate">
            {legal_documents?.memorandumOfAssociationFilename}
          </span>
        </div>
      </div>
      <div className="row col-sm-12 avout formStyles p-15 pt-3">
        <div className="col-md-12 col-sm-12 titleprev">
          <label class="alignleft">
            Articles of Association
            {legal_documents.articlesOfAssociationUrl != null && (
              <a href={legal_documents ? legal_documents.articlesOfAssociationUrl : ""} target="_blank">
                <img src={downloadIcon} alt="" />
              </a>
            )}
          </label>
          <span style={{ fontSize: 12, maxWidth: 280 }} className="d-inline-block text-truncate">
            {legal_documents?.articlesOfAssociationFilename}
          </span>
        </div>
      </div>
      <div className="row col-sm-12 avout formStyles p-15 pt-3">
        <div className="col-md-12 col-sm-12 titleprev">
          <label class="alignleft">
            80G/12A/12AA Certificate
            {legal_documents.urlOf80G12A12AACertificate != null && (
              <a href={legal_documents ? legal_documents.urlOf80G12A12AACertificate : ""} target="_blank">
                <img src={downloadIcon} alt="" />
              </a>
            )}
          </label>
          <span style={{ fontSize: 12, maxWidth: 280 }} className="d-inline-block text-truncate">
            {legal_documents?.urlOf80G12A12AACertificateFilename}
          </span>
        </div>
      </div>
      <div className="row col-sm-12 avout formStyles p-15 pt-3">
        <div className="col-md-12 col-sm-12 titleprev">
          <label class="alignleft">
            Form CSR 1
            {legal_documents.formCSR1Url != null && (
              <a href={legal_documents ? legal_documents.formCSR1Url : ""} target="_blank">
                <img src={downloadIcon} alt="" />
              </a>
            )}
          </label>
          <span style={{ fontSize: 12, maxWidth: 280 }} className="d-inline-block text-truncate">
            {legal_documents?.formCSR1Filename}
          </span>
        </div>
      </div>
    </div>
  );
}
export default DocumentPreview;
