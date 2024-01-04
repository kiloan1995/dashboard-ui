/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { Application, ApplicationStatus } from "../functions/src/models/Application";
import { Breadcrumb } from "./global/Breadcrumb";
import { Job } from "../functions/src/models/Job";
export { Application, ApplicationStatus } from "../functions/src/models/Application";
export { Breadcrumb } from "./global/Breadcrumb";
export { Job } from "../functions/src/models/Job";
export namespace Components {
    interface AppRoot {
    }
    interface ChartHistogram {
        "xAxisLabel": string;
        "yAxisLabel": string;
    }
    interface ChartIndex {
        "textTotal": string;
    }
    interface ChartPage {
    }
    interface ChartPie {
        "textTotal": string;
    }
    interface FilterPicker {
        "date": Date;
        "urlParamName": string;
    }
    interface ListView {
        "columnNames": string[];
        "fillTablePredicate"?: (item: any) => string[];
        "heading": string;
        "items": any[];
    }
    interface PageApplication {
        "application": Application;
    }
    interface PageBreadcrumbs {
        "breadcrumbs": Breadcrumb[];
    }
    interface PageDashboard {
    }
    interface PageFooter {
    }
    interface PageHeader {
        "breadcrumbs": Breadcrumb[];
    }
    interface PageJob {
        "job": Job;
    }
    interface PreviewTile {
        "bIsAverage": boolean;
        "small": string;
        "title": string;
    }
    interface StatusPreview {
        "status": ApplicationStatus[];
    }
    interface SummaryView {
        "color": string;
    }
}
export interface ListViewCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLListViewElement;
}
declare global {
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLChartHistogramElement extends Components.ChartHistogram, HTMLStencilElement {
    }
    var HTMLChartHistogramElement: {
        prototype: HTMLChartHistogramElement;
        new (): HTMLChartHistogramElement;
    };
    interface HTMLChartIndexElement extends Components.ChartIndex, HTMLStencilElement {
    }
    var HTMLChartIndexElement: {
        prototype: HTMLChartIndexElement;
        new (): HTMLChartIndexElement;
    };
    interface HTMLChartPageElement extends Components.ChartPage, HTMLStencilElement {
    }
    var HTMLChartPageElement: {
        prototype: HTMLChartPageElement;
        new (): HTMLChartPageElement;
    };
    interface HTMLChartPieElement extends Components.ChartPie, HTMLStencilElement {
    }
    var HTMLChartPieElement: {
        prototype: HTMLChartPieElement;
        new (): HTMLChartPieElement;
    };
    interface HTMLFilterPickerElement extends Components.FilterPicker, HTMLStencilElement {
    }
    var HTMLFilterPickerElement: {
        prototype: HTMLFilterPickerElement;
        new (): HTMLFilterPickerElement;
    };
    interface HTMLListViewElement extends Components.ListView, HTMLStencilElement {
    }
    var HTMLListViewElement: {
        prototype: HTMLListViewElement;
        new (): HTMLListViewElement;
    };
    interface HTMLPageApplicationElement extends Components.PageApplication, HTMLStencilElement {
    }
    var HTMLPageApplicationElement: {
        prototype: HTMLPageApplicationElement;
        new (): HTMLPageApplicationElement;
    };
    interface HTMLPageBreadcrumbsElement extends Components.PageBreadcrumbs, HTMLStencilElement {
    }
    var HTMLPageBreadcrumbsElement: {
        prototype: HTMLPageBreadcrumbsElement;
        new (): HTMLPageBreadcrumbsElement;
    };
    interface HTMLPageDashboardElement extends Components.PageDashboard, HTMLStencilElement {
    }
    var HTMLPageDashboardElement: {
        prototype: HTMLPageDashboardElement;
        new (): HTMLPageDashboardElement;
    };
    interface HTMLPageFooterElement extends Components.PageFooter, HTMLStencilElement {
    }
    var HTMLPageFooterElement: {
        prototype: HTMLPageFooterElement;
        new (): HTMLPageFooterElement;
    };
    interface HTMLPageHeaderElement extends Components.PageHeader, HTMLStencilElement {
    }
    var HTMLPageHeaderElement: {
        prototype: HTMLPageHeaderElement;
        new (): HTMLPageHeaderElement;
    };
    interface HTMLPageJobElement extends Components.PageJob, HTMLStencilElement {
    }
    var HTMLPageJobElement: {
        prototype: HTMLPageJobElement;
        new (): HTMLPageJobElement;
    };
    interface HTMLPreviewTileElement extends Components.PreviewTile, HTMLStencilElement {
    }
    var HTMLPreviewTileElement: {
        prototype: HTMLPreviewTileElement;
        new (): HTMLPreviewTileElement;
    };
    interface HTMLStatusPreviewElement extends Components.StatusPreview, HTMLStencilElement {
    }
    var HTMLStatusPreviewElement: {
        prototype: HTMLStatusPreviewElement;
        new (): HTMLStatusPreviewElement;
    };
    interface HTMLSummaryViewElement extends Components.SummaryView, HTMLStencilElement {
    }
    var HTMLSummaryViewElement: {
        prototype: HTMLSummaryViewElement;
        new (): HTMLSummaryViewElement;
    };
    interface HTMLElementTagNameMap {
        "app-root": HTMLAppRootElement;
        "chart-histogram": HTMLChartHistogramElement;
        "chart-index": HTMLChartIndexElement;
        "chart-page": HTMLChartPageElement;
        "chart-pie": HTMLChartPieElement;
        "filter-picker": HTMLFilterPickerElement;
        "list-view": HTMLListViewElement;
        "page-application": HTMLPageApplicationElement;
        "page-breadcrumbs": HTMLPageBreadcrumbsElement;
        "page-dashboard": HTMLPageDashboardElement;
        "page-footer": HTMLPageFooterElement;
        "page-header": HTMLPageHeaderElement;
        "page-job": HTMLPageJobElement;
        "preview-tile": HTMLPreviewTileElement;
        "status-preview": HTMLStatusPreviewElement;
        "summary-view": HTMLSummaryViewElement;
    }
}
declare namespace LocalJSX {
    interface AppRoot {
    }
    interface ChartHistogram {
        "xAxisLabel"?: string;
        "yAxisLabel"?: string;
    }
    interface ChartIndex {
        "textTotal"?: string;
    }
    interface ChartPage {
    }
    interface ChartPie {
        "textTotal"?: string;
    }
    interface FilterPicker {
        "date"?: Date;
        "urlParamName"?: string;
    }
    interface ListView {
        "columnNames"?: string[];
        "fillTablePredicate"?: (item: any) => string[];
        "heading"?: string;
        "items"?: any[];
        "onItemClicked"?: (event: ListViewCustomEvent<any>) => void;
    }
    interface PageApplication {
        "application"?: Application;
    }
    interface PageBreadcrumbs {
        "breadcrumbs"?: Breadcrumb[];
    }
    interface PageDashboard {
    }
    interface PageFooter {
    }
    interface PageHeader {
        "breadcrumbs"?: Breadcrumb[];
    }
    interface PageJob {
        "job"?: Job;
    }
    interface PreviewTile {
        "bIsAverage"?: boolean;
        "small"?: string;
        "title"?: string;
    }
    interface StatusPreview {
        "status"?: ApplicationStatus[];
    }
    interface SummaryView {
        "color"?: string;
    }
    interface IntrinsicElements {
        "app-root": AppRoot;
        "chart-histogram": ChartHistogram;
        "chart-index": ChartIndex;
        "chart-page": ChartPage;
        "chart-pie": ChartPie;
        "filter-picker": FilterPicker;
        "list-view": ListView;
        "page-application": PageApplication;
        "page-breadcrumbs": PageBreadcrumbs;
        "page-dashboard": PageDashboard;
        "page-footer": PageFooter;
        "page-header": PageHeader;
        "page-job": PageJob;
        "preview-tile": PreviewTile;
        "status-preview": StatusPreview;
        "summary-view": SummaryView;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "chart-histogram": LocalJSX.ChartHistogram & JSXBase.HTMLAttributes<HTMLChartHistogramElement>;
            "chart-index": LocalJSX.ChartIndex & JSXBase.HTMLAttributes<HTMLChartIndexElement>;
            "chart-page": LocalJSX.ChartPage & JSXBase.HTMLAttributes<HTMLChartPageElement>;
            "chart-pie": LocalJSX.ChartPie & JSXBase.HTMLAttributes<HTMLChartPieElement>;
            "filter-picker": LocalJSX.FilterPicker & JSXBase.HTMLAttributes<HTMLFilterPickerElement>;
            "list-view": LocalJSX.ListView & JSXBase.HTMLAttributes<HTMLListViewElement>;
            "page-application": LocalJSX.PageApplication & JSXBase.HTMLAttributes<HTMLPageApplicationElement>;
            "page-breadcrumbs": LocalJSX.PageBreadcrumbs & JSXBase.HTMLAttributes<HTMLPageBreadcrumbsElement>;
            "page-dashboard": LocalJSX.PageDashboard & JSXBase.HTMLAttributes<HTMLPageDashboardElement>;
            "page-footer": LocalJSX.PageFooter & JSXBase.HTMLAttributes<HTMLPageFooterElement>;
            "page-header": LocalJSX.PageHeader & JSXBase.HTMLAttributes<HTMLPageHeaderElement>;
            "page-job": LocalJSX.PageJob & JSXBase.HTMLAttributes<HTMLPageJobElement>;
            "preview-tile": LocalJSX.PreviewTile & JSXBase.HTMLAttributes<HTMLPreviewTileElement>;
            "status-preview": LocalJSX.StatusPreview & JSXBase.HTMLAttributes<HTMLStatusPreviewElement>;
            "summary-view": LocalJSX.SummaryView & JSXBase.HTMLAttributes<HTMLSummaryViewElement>;
        }
    }
}
