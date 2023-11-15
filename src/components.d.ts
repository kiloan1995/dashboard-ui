/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AppRoot {
    }
    interface ChartHistogram {
    }
    interface ChartPage {
    }
    interface ChartPie {
        "textTotal": string;
    }
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
    interface HTMLElementTagNameMap {
        "app-root": HTMLAppRootElement;
        "chart-histogram": HTMLChartHistogramElement;
        "chart-page": HTMLChartPageElement;
        "chart-pie": HTMLChartPieElement;
    }
}
declare namespace LocalJSX {
    interface AppRoot {
    }
    interface ChartHistogram {
    }
    interface ChartPage {
    }
    interface ChartPie {
        "textTotal"?: string;
    }
    interface IntrinsicElements {
        "app-root": AppRoot;
        "chart-histogram": ChartHistogram;
        "chart-page": ChartPage;
        "chart-pie": ChartPie;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "chart-histogram": LocalJSX.ChartHistogram & JSXBase.HTMLAttributes<HTMLChartHistogramElement>;
            "chart-page": LocalJSX.ChartPage & JSXBase.HTMLAttributes<HTMLChartPageElement>;
            "chart-pie": LocalJSX.ChartPie & JSXBase.HTMLAttributes<HTMLChartPieElement>;
        }
    }
}
