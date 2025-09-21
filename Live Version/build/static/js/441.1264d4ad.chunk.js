/** @format */

"use strict";
(self.webpackChunkmain_project = self.webpackChunkmain_project || []).push([
    [441],
    {
        298: (e, t, a) => {
            a.d(t, { A: () => I });
            var n = a(45),
                r = a(9379),
                o = a(5043),
                i = a(8387),
                d = a(3129),
                l = a(6061),
                s = a(1807),
                c = a(883),
                p = a(4943),
                h = a(5227),
                u = a(9049),
                g = a(6167),
                m = a(1834),
                x = a(579);
            const f = [
                    "component",
                    "direction",
                    "spacing",
                    "divider",
                    "children",
                    "className",
                    "useFlexGap",
                ],
                b = (0, u.A)(),
                v = (0, c.A)("div", { name: "MuiStack", slot: "Root" });
            function A(e) {
                return (0, p.A)({
                    props: e,
                    name: "MuiStack",
                    defaultTheme: b,
                });
            }
            function k(e, t) {
                const a = o.Children.toArray(e).filter(Boolean);
                return a.reduce(
                    (e, n, r) => (
                        e.push(n),
                        r < a.length - 1 &&
                            e.push(
                                o.cloneElement(t, {
                                    key: "separator-".concat(r),
                                })
                            ),
                        e
                    ),
                    []
                );
            }
            const y = (e) => {
                let { ownerState: t, theme: a } = e,
                    n = (0, r.A)(
                        { display: "flex", flexDirection: "column" },
                        (0, g.NI)(
                            { theme: a },
                            (0, g.kW)({
                                values: t.direction,
                                breakpoints: a.breakpoints.values,
                            }),
                            (e) => ({ flexDirection: e })
                        )
                    );
                if (t.spacing) {
                    const e = (0, m.LX)(a),
                        r = Object.keys(a.breakpoints.values).reduce(
                            (e, a) => (
                                (("object" === typeof t.spacing &&
                                    null != t.spacing[a]) ||
                                    ("object" === typeof t.direction &&
                                        null != t.direction[a])) &&
                                    (e[a] = !0),
                                e
                            ),
                            {}
                        ),
                        o = (0, g.kW)({ values: t.direction, base: r }),
                        i = (0, g.kW)({ values: t.spacing, base: r });
                    "object" === typeof o &&
                        Object.keys(o).forEach((e, t, a) => {
                            if (!o[e]) {
                                const n = t > 0 ? o[a[t - 1]] : "column";
                                o[e] = n;
                            }
                        });
                    const l = (a, n) => {
                        return t.useFlexGap
                            ? { gap: (0, m._W)(e, a) }
                            : {
                                  "& > :not(style):not(style)": { margin: 0 },
                                  "& > :not(style) ~ :not(style)": {
                                      ["margin".concat(
                                          ((r = n ? o[n] : t.direction),
                                          {
                                              row: "Left",
                                              "row-reverse": "Right",
                                              column: "Top",
                                              "column-reverse": "Bottom",
                                          }[r])
                                      )]: (0, m._W)(e, a),
                                  },
                              };
                        var r;
                    };
                    n = (0, d.A)(n, (0, g.NI)({ theme: a }, i, l));
                }
                return (n = (0, g.iZ)(a.breakpoints, n)), n;
            };
            var w = a(8128),
                j = a(8301);
            const C = (function () {
                    let e =
                        arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : {};
                    const {
                            createStyledComponent: t = v,
                            useThemeProps: a = A,
                            componentName: d = "MuiStack",
                        } = e,
                        c = t(y),
                        p = o.forwardRef(function (e, t) {
                            const o = a(e),
                                p = (0, h.A)(o),
                                {
                                    component: u = "div",
                                    direction: g = "column",
                                    spacing: m = 0,
                                    divider: b,
                                    children: v,
                                    className: A,
                                    useFlexGap: y = !1,
                                } = p,
                                w = (0, n.A)(p, f),
                                j = { direction: g, spacing: m, useFlexGap: y },
                                C = (0, s.A)(
                                    { root: ["root"] },
                                    (e) => (0, l.Ay)(d, e),
                                    {}
                                );
                            return (0,
                            x.jsx)(c, (0, r.A)((0, r.A)({ as: u, ownerState: j, ref: t, className: (0, i.A)(C.root, A) }, w), {}, { children: b ? k(v, b) : v }));
                        });
                    return p;
                })({
                    createStyledComponent: (0, w.Ay)("div", {
                        name: "MuiStack",
                        slot: "Root",
                    }),
                    useThemeProps: (e) =>
                        (0, j.b)({ props: e, name: "MuiStack" }),
                }),
                I = C;
        },
        441: (e, t, a) => {
            a.r(t), a.d(t, { default: () => N });
            var n = a(5043),
                r = a(3969),
                o = a(9806),
                i = a(5895),
                d = a(298),
                l = a(6995),
                s = a(3182),
                c = a(2097),
                p = a(256),
                h = a(9067),
                u = a(7203),
                g = a(8688),
                m = a(9981),
                x = a(267),
                f = a(579);
            const b = (e) => {
                let {
                    chapters: t = [],
                    chapterData: a = null,
                    mangaTitle: n = "",
                    zoomMode: o = "fit-width",
                    handleZoomChange: d = () => {},
                    handlePrevChapter: b = () => {},
                    handleNextChapter: v = () => {},
                    minimalMode: A = !1,
                } = e;
                const k = (0, m.Zp)(),
                    y = (0, x.A)(),
                    w = t
                        ? t.findIndex(
                              (e) =>
                                  e.id ===
                                  (null === a || void 0 === a ? void 0 : a.id)
                          )
                        : -1,
                    j = w === t.length - 1,
                    C = 0 === w,
                    I = (0, l.A)(y.breakpoints.down("sm"));
                return (0, f.jsxs)(r.A, {
                    sx: {
                        margin: "64px 0 32px 0",
                        background:
                            "dark" === y.palette.mode
                                ? "linear-gradient(135deg, rgba(18,21,27,0.9), rgba(31,41,55,0.8), rgba(55,65,81,0.9))"
                                : "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(245,247,251,0.8), rgba(229,231,235,0.9))",
                        backdropFilter: "blur(12px)",
                        boxShadow:
                            "dark" === y.palette.mode
                                ? "0 10px 30px rgba(0,0,0,0.6)"
                                : "0 10px 30px rgba(0,0,0,0.2)",
                        borderRadius: "16px",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        border:
                            "dark" === y.palette.mode
                                ? "1px solid rgba(255,255,255,0.08)"
                                : "1px solid rgba(0,0,0,0.08)",
                    },
                    children: [
                        !A &&
                            (0, f.jsxs)(i.A, {
                                variant: I ? "h5" : "h4",
                                align: "center",
                                onClick: () => {
                                    var e;
                                    return k(
                                        "/info/".concat(
                                            null === a ||
                                                void 0 === a ||
                                                null ===
                                                    (e = a.relationships) ||
                                                void 0 === e
                                                ? void 0
                                                : e.find(
                                                      (e) => "manga" === e.type
                                                  ).id
                                        )
                                    );
                                },
                                sx: {
                                    cursor: "pointer",
                                    color: y.palette.text.primary,
                                    pt: 2,
                                    pb: 1,
                                    px: 2,
                                    textAlign: "center",
                                    fontWeight: "700",
                                    textShadow:
                                        "dark" === y.palette.mode
                                            ? "0 2px 6px rgba(0,0,0,0.6)"
                                            : "0 2px 6px rgba(0,0,0,0.3)",
                                    transition: "all 0.25s ease",
                                },
                                children: [
                                    n,
                                    " -",
                                    " ",
                                    null !== a &&
                                    void 0 !== a &&
                                    a.attributes.chapter
                                        ? "Chapter ".concat(
                                              a.attributes.chapter
                                          )
                                        : "Oneshot",
                                ],
                            }),
                        (0, f.jsxs)(s.A, {
                            sx: {
                                flexDirection: I ? "column" : "row",
                                display: "flex",
                                "& > *": { width: I ? "100%" : "auto" },
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                                gap: 1,
                                px: 2,
                                py: 2,
                            },
                            children: [
                                (0, f.jsx)(c.A, {
                                    variant: "contained",
                                    onClick: b,
                                    disabled: j,
                                    sx: {
                                        background: "linear-gradient(135deg, "
                                            .concat(
                                                y.palette.primary.main,
                                                ", "
                                            )
                                            .concat(
                                                y.palette.secondary.main,
                                                ")"
                                            ),
                                        color: y.palette.getContrastText(
                                            y.palette.primary.main
                                        ),
                                        fontWeight: "600",
                                        borderRadius: "12px",
                                        "&:hover": {
                                            background:
                                                "linear-gradient(135deg, "
                                                    .concat(
                                                        y.palette.primary.dark,
                                                        ", "
                                                    )
                                                    .concat(
                                                        y.palette.secondary
                                                            .dark,
                                                        ")"
                                                    ),
                                        },
                                    },
                                    children: "Prev Chapter",
                                }),
                                !A &&
                                    (0, f.jsxs)(p.A, {
                                        sx: { minWidth: 200 },
                                        size: "small",
                                        children: [
                                            (0, f.jsx)(h.A, {
                                                sx: {
                                                    fontWeight: "600",
                                                    color: y.palette.text
                                                        .primary,
                                                },
                                                children: "Chapter",
                                            }),
                                            (0, f.jsx)(u.A, {
                                                value:
                                                    null === a || void 0 === a
                                                        ? void 0
                                                        : a.id,
                                                label: "Chapter",
                                                onChange: (e) =>
                                                    k(
                                                        "/read/"
                                                            .concat(
                                                                a.relationships.find(
                                                                    (e) =>
                                                                        "manga" ===
                                                                        e.type
                                                                ).id,
                                                                "/"
                                                            )
                                                            .concat(
                                                                e.target.value
                                                            )
                                                    ),
                                                sx: {
                                                    bgcolor:
                                                        "dark" ===
                                                        y.palette.mode
                                                            ? "rgba(255,255,255,0.08)"
                                                            : "rgba(0,0,0,0.08)",
                                                    color: y.palette.text
                                                        .primary,
                                                    fontWeight: "500",
                                                    borderRadius: "12px",
                                                    backdropFilter: "blur(6px)",
                                                },
                                                children:
                                                    t.length > 0
                                                        ? t.map((e) =>
                                                              (0, f.jsx)(
                                                                  g.A,
                                                                  {
                                                                      value: e.id,
                                                                      children:
                                                                          e
                                                                              .attributes
                                                                              .chapter
                                                                              ? "Chapter ".concat(
                                                                                    e
                                                                                        .attributes
                                                                                        .chapter
                                                                                )
                                                                              : "Oneshot",
                                                                  },
                                                                  e.id
                                                              )
                                                          )
                                                        : (0, f.jsx)(g.A, {
                                                              disabled: !0,
                                                              children:
                                                                  "No Chapters",
                                                          }),
                                            }),
                                        ],
                                    }),
                                !A &&
                                    d &&
                                    (0, f.jsxs)(p.A, {
                                        sx: { minWidth: 160 },
                                        size: "small",
                                        children: [
                                            (0, f.jsx)(h.A, {
                                                sx: {
                                                    fontWeight: "600",
                                                    color: y.palette.text
                                                        .primary,
                                                },
                                                children: "Zoom",
                                            }),
                                            (0, f.jsxs)(u.A, {
                                                value: o,
                                                label: "Zoom",
                                                onChange: d,
                                                children: [
                                                    (0, f.jsx)(g.A, {
                                                        value: "large",
                                                        children: "Large",
                                                    }),
                                                    (0, f.jsx)(g.A, {
                                                        value: "fit-width",
                                                        children: "Fit Width",
                                                    }),
                                                    (0, f.jsx)(g.A, {
                                                        value: "medium",
                                                        children: "Medium",
                                                    }),
                                                    (0, f.jsx)(g.A, {
                                                        value: "small",
                                                        children: "Small",
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                (0, f.jsx)(c.A, {
                                    variant: "contained",
                                    onClick: v,
                                    disabled: C,
                                    sx: {
                                        background: "linear-gradient(135deg, "
                                            .concat(
                                                y.palette.primary.main,
                                                ", "
                                            )
                                            .concat(
                                                y.palette.secondary.main,
                                                ")"
                                            ),
                                        color: y.palette.getContrastText(
                                            y.palette.primary.main
                                        ),
                                        fontWeight: "600",
                                        borderRadius: "12px",
                                        "&:hover": {
                                            background:
                                                "linear-gradient(135deg, "
                                                    .concat(
                                                        y.palette.primary.dark,
                                                        ", "
                                                    )
                                                    .concat(
                                                        y.palette.secondary
                                                            .dark,
                                                        ")"
                                                    ),
                                        },
                                    },
                                    children: "Next Chapter",
                                }),
                            ],
                        }),
                    ],
                });
            };
            var v = a(9379);
            const A = (e) => {
                let { pages: t, zoomMode: a } = e;
                const [o, i] = (0, n.useState)({}),
                    d = (0, x.A)(),
                    s = (0, l.A)(d.breakpoints.down("sm")),
                    c = () =>
                        "fit-width" === a
                            ? s
                                ? { width: "100%", height: "auto" }
                                : { width: "80%", height: "auto" }
                            : "small" === a
                            ? { width: "50%", height: "auto" }
                            : "medium" === a
                            ? { width: "60%", height: "auto" }
                            : "large" === a
                            ? { width: "120%", height: "auto" }
                            : { width: "100%", height: "auto" };
                return t.map((e, t) =>
                    (0, f.jsxs)(
                        r.A,
                        {
                            sx: { display: "flex", justifyContent: "center" },
                            children: [
                                !o[t] &&
                                    (0, f.jsx)(r.A, {
                                        sx: (0, v.A)(
                                            (0, v.A)({}, c()),
                                            {},
                                            {
                                                height: "600px",
                                                borderRadius: "12px",
                                                background:
                                                    "linear-gradient(90deg, #2a2a40 25%, #3a3a55 50%, #2a2a40 75%)",
                                                backgroundSize: "200% 100%",
                                                animation:
                                                    "shimmer 1.5s infinite",
                                                "@keyframes shimmer": {
                                                    "0%": {
                                                        backgroundPosition:
                                                            "-200% 0",
                                                    },
                                                    "100%": {
                                                        backgroundPosition:
                                                            "200% 0",
                                                    },
                                                },
                                            }
                                        ),
                                    }),
                                (0, f.jsx)("img", {
                                    src: e,
                                    alt: "Page ".concat(t + 1),
                                    style: (0, v.A)(
                                        (0, v.A)({}, c()),
                                        {},
                                        {
                                            borderRadius: "12px",
                                            boxShadow:
                                                "0 10px 25px rgba(0,0,0,0.5)",
                                            transition:
                                                "opacity 0.5s ease-in-out",
                                            opacity: o[t] ? 1 : 0,
                                            position: o[t]
                                                ? "relative"
                                                : "absolute",
                                        }
                                    ),
                                    onLoad: () =>
                                        i((e) =>
                                            (0, v.A)(
                                                (0, v.A)({}, e),
                                                {},
                                                { [t]: !0 }
                                            )
                                        ),
                                }),
                            ],
                        },
                        t
                    )
                );
            };
            var k = a(9417),
                y = a(4339),
                w = a(2555);
            const j = (0, a(9992).A)(
                    (0, f.jsx)("path", {
                        d: "M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z",
                    }),
                    "KeyboardArrowUp"
                ),
                C = () => {
                    const e = (0, k.A)({ threshold: 200 });
                    return (0, f.jsx)(y.A, {
                        direction: "up",
                        in: e,
                        mountOnEnter: !0,
                        unmountOnExit: !0,
                        children: (0, f.jsx)(w.A, {
                            color: "primary",
                            size: "medium",
                            onClick: () =>
                                window.scrollTo({ top: 0, behavior: "smooth" }),
                            sx: {
                                position: "fixed",
                                bottom: 24,
                                right: 24,
                                background:
                                    "linear-gradient(135deg,#ff6ec4,#7873f5)",
                                "&:hover": {
                                    background:
                                        "linear-gradient(135deg,#ff4db0,#5f5fff)",
                                },
                            },
                            children: (0, f.jsx)(j, {}),
                        }),
                    });
                };
            var I = a(2666);
            const S = () => {
                var e;
                const t = (0, m.g)(),
                    a = (0, m.Zp)(),
                    [r, o] = (0, n.useState)([]),
                    [i, d] = (0, n.useState)(null),
                    [l, s] = (0, n.useState)([]),
                    [c, p] = (0, n.useState)("fit-width"),
                    [h, u] = (0, n.useState)(!0),
                    [g, x] = (0, n.useState)(""),
                    f = (0, n.useRef)(!1),
                    { data: b, isLoading: v } = (0, I.IR)({
                        mode: "chapter",
                        chapterId: t.id,
                    }),
                    { data: A, isLoading: k } = (0, I.IR)({
                        mode: "atHome",
                        chapterId: t.id,
                    }),
                    { data: y, isLoading: w } = (0, I.IR)({
                        mode: "details",
                        mangaId: t.mangaId,
                    }),
                    {
                        data: j,
                        fetchNextPage: C,
                        hasNextPage: S,
                        isFetchingNextPage: M,
                        isLoading: N,
                    } = (0, I.K8)({
                        mode: "chapters",
                        limit: 100,
                        mangaId: t.mangaId,
                        query: !0,
                        order: "desc",
                    }),
                    R =
                        null !==
                            (e =
                                null === j || void 0 === j
                                    ? void 0
                                    : j.pages.flatMap((e) => e.chapters)) &&
                        void 0 !== e
                            ? e
                            : [];
                (0, n.useEffect)(() => {
                    !S || M || N || C();
                }, [S, M, N, C, j, t.mangaId]),
                    (0, n.useEffect)(() => {
                        R.length !== l.length && s(R);
                    }, [R, l.length]),
                    (0, n.useEffect)(() => {
                        !w && y && x(y.titleEN || "Unknown Manga");
                    }, [t.mangaId, y, w]),
                    (0, n.useEffect)(() => {
                        var e;
                        if ((u(!0), o([]), d(b), !v && !k)) {
                            if (!b) return u(!1);
                            if (
                                (null !== b &&
                                    void 0 !== b &&
                                    null !== (e = b.attributes) &&
                                    void 0 !== e &&
                                    e.externalUrl) ||
                                !A
                            )
                                window.location.href = b.attributes.externalUrl;
                            else {
                                const e = A.baseUrl,
                                    t = A.chapter.hash,
                                    a = A.chapter.data;
                                o(
                                    a.map((a) =>
                                        "https://sadmanga-production.up.railway.app/page?baseUrl="
                                            .concat(
                                                encodeURIComponent(e),
                                                "&hash="
                                            )
                                            .concat(t, "&pageData=")
                                            .concat(a)
                                    )
                                );
                            }
                            u(!1);
                        }
                    }, [b, A, v, k]);
                const L = () => {
                        const e = l.findIndex((e) => e.id === t.id);
                        e >= 0 &&
                            e < l.length - 1 &&
                            a(
                                "/read/"
                                    .concat(t.mangaId, "/")
                                    .concat(l[e + 1].id)
                            );
                    },
                    W = () => {
                        const e = l.findIndex((e) => e.id === t.id);
                        e > 0 &&
                            a(
                                "/read/"
                                    .concat(t.mangaId, "/")
                                    .concat(l[e - 1].id)
                            );
                    },
                    E = (e) => {
                        f.current ||
                            ((f.current = !0),
                            "ArrowLeft" === e.key && L(),
                            "ArrowRight" === e.key && W());
                    },
                    P = (e) => {
                        ("ArrowLeft" !== e.key && "ArrowRight" !== e.key) ||
                            (f.current = !1);
                    };
                return (
                    (0, n.useEffect)(
                        () => (
                            window.addEventListener("keydown", E),
                            window.addEventListener("keyup", P),
                            () => {
                                window.removeEventListener("keydown", E),
                                    window.removeEventListener("keyup", P);
                            }
                        ),
                        [l, t.id]
                    ),
                    {
                        pages: r,
                        chapterData: i,
                        chapters: l,
                        zoomMode: c,
                        setZoomMode: p,
                        loading: h,
                        mangaTitle: g,
                        handleZoomChange: (e) => p(e.target.value),
                        handlePrevChapter: L,
                        handleNextChapter: W,
                        currentChapterIndex: l.findIndex((e) => e.id === t.id),
                    }
                );
            };
            var M = a(4859);
            const N = function () {
                const {
                        pages: e,
                        loading: t,
                        mangaTitle: a,
                        chapters: l,
                        chapterData: s,
                        zoomMode: c,
                        handleZoomChange: p,
                        handlePrevChapter: h,
                        handleNextChapter: u,
                        currentChapterIndex: g,
                    } = S(),
                    { addChapter: m } = (0, M.A)(),
                    x = window.location.pathname.split("/")[2],
                    v = window.location.pathname.split("/")[3];
                return (
                    (0, n.useEffect)(() => {
                        m(x, v);
                    }, [x, v, m]),
                    (0, f.jsxs)(r.A, {
                        sx: {
                            minHeight: "100vh",
                            background:
                                "linear-gradient(to bottom, #1a1a2e, #0f0f1a)",
                        },
                        children: [
                            (0, f.jsx)(o.A, {
                                maxWidth: "lg",
                                sx: { mt: 4 },
                                children: t
                                    ? (0, f.jsx)(i.A, {
                                          variant: "h4",
                                          m: "64px",
                                          p: 2,
                                          align: "center",
                                          color: "white",
                                          children: "Loading Chapter...",
                                      })
                                    : (0, f.jsxs)(d.A, {
                                          children: [
                                              (0, f.jsx)(b, {
                                                  chapters: l,
                                                  chapterData: s,
                                                  mangaTitle: a,
                                                  zoomMode: c,
                                                  handleZoomChange: p,
                                                  handlePrevChapter: h,
                                                  handleNextChapter: u,
                                              }),
                                              (0, f.jsx)(A, {
                                                  pages: e,
                                                  zoomMode: c,
                                              }),
                                              (0, f.jsx)(b, {
                                                  chapters: l,
                                                  chapterData: s,
                                                  mangaTitle: a,
                                                  zoomMode: c,
                                                  handlePrevChapter: h,
                                                  handleNextChapter: u,
                                                  minimalMode: !0,
                                              }),
                                          ],
                                      }),
                            }),
                            (0, f.jsx)(C, {}),
                        ],
                    })
                );
            };
        },
        883: (e, t, a) => {
            a.d(t, { A: () => n });
            const n = (0, a(7675).Ay)();
        },
        4943: (e, t, a) => {
            a.d(t, { A: () => o });
            var n = a(8480),
                r = a(4265);
            function o(e) {
                let { props: t, name: a, defaultTheme: o, themeId: i } = e,
                    d = (0, r.A)(o);
                return (
                    i && (d = d[i] || d),
                    (0, n.A)({ theme: d, name: a, props: t })
                );
            }
        },
    },
]);
//# sourceMappingURL=441.1264d4ad.chunk.js.map
