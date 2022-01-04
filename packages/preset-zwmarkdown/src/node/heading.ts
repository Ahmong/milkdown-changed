/* Copyright 2021, Milkdown by Mirone. */
import { css } from '@emotion/css';
import { createCmd, createCmdKey } from '@milkdown/core';
import { setBlockType, textblockTypeInputRule } from '@milkdown/prose';
import { createNode, createShortcut } from '@milkdown/utils';

import { SupportedKeys } from '../supported-keys';

const headingIndex = Array(6)
    .fill(0)
    .map((_, i) => i + 1);

type Keys =
    | SupportedKeys['H1']
    | SupportedKeys['H2']
    | SupportedKeys['H3']
    | SupportedKeys['H4']
    | SupportedKeys['H5']
    | SupportedKeys['H6'];

export const TurnIntoHeading = createCmdKey<number>();

export const heading = createNode<Keys>((utils, options) => {
    const id = 'heading';
    const themeTool = utils.themeTool;
    const headingMap: Record<number, string> = {
        1: css`
            font-size: 1.75rem;
            line-height: 2.625rem;
            margin: 2.5rem 0;
            font-weight: 600;
            color: ${themeTool.extColor('textTitleH1')};
        `,
        2: css`
            font-size: 1.5rem;
            line-height: 2.25rem;
            margin: 2rem 0;
            font-weight: 500;
            color: ${themeTool.extColor('textTitleH2')};
        `,
        3: css`
            font-size: 1.25rem;
            line-height: 1.875rem;
            margin: 1.75rem 0;
            font-weight: 500;
            color: ${themeTool.extColor('textTitleH3')};
        `,
        4: css`
            font-size: 1.225rem;
            line-height: 1.6rem;
            margin: 1.5rem 0;
            font-weight: 400;
            color: ${themeTool.extColor('textTitleH4')};
        `,
        5: css`
            font-size: 1.2rem;
            line-height: 1.55rem;
            margin: 1.5rem 0;
            font-weight: 400;
            color: ${themeTool.extColor('textTitleH5')};
        `,
        6: css`
            font-size: 1.1rem;
            line-height: 1.45rem;
            margin: 1.5rem 0;
            font-weight: 400;
            color: ${themeTool.extColor('textTitleH6')};
        `,
    };

    const style = (level: number) =>
        options?.headless
            ? null
            : css`
                  ${headingMap[level] || ''}
              `;

    return {
        id,
        schema: () => ({
            content: 'inline*',
            group: 'block',
            attrs: {
                level: {
                    default: 1,
                },
                id: {
                    default: '',
                },
            },
            parseDOM: headingIndex.map((x) => ({ tag: `h${x}`, attrs: { level: x } })),
            toDOM: (node) => {
                return [
                    `h${node.attrs.level}`,
                    {
                        class: utils.getClassName(node.attrs, `heading h${node.attrs.level}`, style(node.attrs.level)),
                    },
                    0,
                ];
            },
            parseMarkdown: {
                match: ({ type }) => type === id,
                runner: (state, node, type) => {
                    const depth = node.depth as number;
                    state.openNode(type, { level: depth });
                    state.next(node.children);
                    state.closeNode();
                },
            },
            toMarkdown: {
                match: (node) => node.type.name === id,
                runner: (state, node) => {
                    state.openNode('heading', undefined, { depth: node.attrs.level });
                    state.next(node.content);
                    state.closeNode();
                },
            },
        }),
        inputRules: (type) =>
            headingIndex.map((x) =>
                textblockTypeInputRule(new RegExp(`^(#{1,${x}})\\s$`), type, () => ({
                    level: x,
                })),
            ),
        commands: (type) => [createCmd(TurnIntoHeading, (level = 1) => setBlockType(type, { level }))],
        shortcuts: {
            [SupportedKeys.H1]: createShortcut(TurnIntoHeading, 'Mod-Alt-1', 1),
            [SupportedKeys.H2]: createShortcut(TurnIntoHeading, 'Mod-Alt-2', 2),
            [SupportedKeys.H3]: createShortcut(TurnIntoHeading, 'Mod-Alt-3', 3),
            [SupportedKeys.H4]: createShortcut(TurnIntoHeading, 'Mod-Alt-4', 4),
            [SupportedKeys.H5]: createShortcut(TurnIntoHeading, 'Mod-Alt-5', 5),
            [SupportedKeys.H6]: createShortcut(TurnIntoHeading, 'Mod-Alt-6', 6),
        },
    };
});