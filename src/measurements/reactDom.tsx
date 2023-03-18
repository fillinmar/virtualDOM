import { execute, root } from './shared';
import {createVNode, render} from "../dom";

export const virtualDomRender = (data: Array<Array<string>>, timerLabel: string) => {
    return execute(timerLabel, () => virtualTable(data));
}

export const virtualDomRenderNull = () => {
    return execute('VirtualDOM.renderNull', () => {
            render(root, {
                view: () => {
                    return null
                },
            });
        }
    );
}

const virtualTable = (data: Array<Array<string>>) => {
    render(root, {
        view: function () {
            return (
                <div>
                    {data.map(row =>
                        <div class='row'>
                            {row.map(cell =>
                                <div key={cell}>
                                    {cell}
                                </div>
                            )}
                        </div>
                    )}
            </div>
            )
        },
    });
}

