import React from "react";
import { BrowserRouter, Navigate, useNavigate, useLocation, useParams, useMatch, useRoutes } from "react-router-dom";

type ComponentType = React.ComponentType<any>;

export type RoutePropsNormal = {
	caseSensitive?: boolean;
	children?: RouteProps[];
	element?: React.ReactNode;
	redirectTo?: string;
	path?: string;
};

export type RoutePropsRedirect = {
	redirectTo?: string;
	path?: string;
};

export type RouteProps = RoutePropsNormal | RoutePropsRedirect;

const makeRoutes = (
	inRoutes: RouteProps[],
	HomeComponent: ComponentType | null = null,
	NotFoundComponent: ComponentType | null = null
) => {
	if (!!HomeComponent) {
		inRoutes.push({
			path: "/",
			element: <HomeComponent />,
		});
	}

	if (!!NotFoundComponent) {
		inRoutes.push({
			path: "*",
			element: <NotFoundComponent />,
		});
	} else {
		inRoutes.push({
			path: "*",
			redirectTo: "/",
		});
	}

	const outRoutes: RoutePropsNormal[] = inRoutes.map(({ redirectTo, ...route }) => {
		if (!!redirectTo) {
			return {
				...route,
				element: <Navigate to={redirectTo} replace />,
			};
		}
		return route;
	});

	const Routes = React.memo(() => {
		const element = useRoutes(outRoutes);
		return element;
	});

	return React.memo(() => (
		<BrowserRouter>
			<Routes />
		</BrowserRouter>
	));
};

export { makeRoutes, Navigate, useNavigate, useLocation, useParams, useMatch };
