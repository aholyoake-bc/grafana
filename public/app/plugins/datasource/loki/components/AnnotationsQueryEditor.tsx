// Libraries
import React, { memo } from 'react';

import { AnnotationQuery } from '@grafana/data';

// Types
import { LokiDatasource } from '../datasource';
import { LokiQuery } from '../types';

import { LokiOptionFields } from './LokiOptionFields';
import { LokiQueryField } from './LokiQueryField';
import { LokiQueryEditorProps } from './types';

// interface Props {
//   expr: string;
//   maxLines?: number;
//   instant?: boolean;
//   datasource: LokiDatasource;
//   onChange: (query: LokiQuery) => void;
// }

type Props = LokiQueryEditorProps & {
  annotation?: AnnotationQuery<LokiQuery>;
  onAnnotationChange?: (annotation: AnnotationQuery<LokiQuery>) => void;
};

export const LokiAnnotationsQueryEditor = memo(function LokiAnnotationQueryEditor(props: Props) {
  const expr: string = props.annotation?.expr ?? '';
  const maxLines: number = props.annotation?.maxLines ?? 1;
  const datasource = props.datasource;
  const instant = false;
  const titleFormat: string = props.annotation?.titleFormat ?? '';
  const textFormat: string = props.annotation?.textFormat ?? '';
  const tagKeys: string = props.annotation?.tagKeys ?? '';

  const annotation = props.annotation!;
  const onAnnotationChange = props.onAnnotationChange!;

  console.log(props);
  const onChangeQuery = (query: LokiQuery) => {
    // const expr = query.expr ?? '';
    // const maxLines = query.maxLines ?? 1;
    // const instant = query.instant ?? false;
    // const onChange = props.onAnnotationChange!;
  };

  const queryWithRefId: LokiQuery = {
    refId: '',
    expr,
    maxLines,
    instant,
  };
  return (
    <>
      <div className="gf-form-group">
        <LokiQueryField
          datasource={datasource}
          query={queryWithRefId}
          onChange={onChangeQuery}
          onRunQuery={() => {}}
          onBlur={() => {}}
          history={[]}
          ExtraFieldElement={
            <LokiOptionFields
              lineLimitValue={queryWithRefId?.maxLines?.toString() || ''}
              resolution={queryWithRefId.resolution || 1}
              query={queryWithRefId}
              onRunQuery={() => {}}
              onChange={onChangeQuery}
            />
          }
        />
      </div>

      <div className="gf-form-group">
        <h5 className="section-heading">
          Field formats
          {/* <span>
            For title and text fields, use either the name or a pattern. For example, [[ instance ]] is replaced with
            label value for the label instance.
          </span> */}
        </h5>
        <div className="gf-form-inline">
          <div className="gf-form">
            <span className="gf-form-label width-5">Title</span>
            <input
              type="text"
              className="gf-form-input max-width-9"
              value={titleFormat}
              onChange={(event) => {
                onAnnotationChange({
                  ...annotation,
                  titleFormat: event.currentTarget.value,
                });
              }}
              placeholder="alertname"
            ></input>
          </div>
          <div className="gf-form">
            <span className="gf-form-label width-5">Tags</span>
            <input
              type="text"
              className="gf-form-input max-width-9"
              value={tagKeys}
              onChange={(event) => {
                onAnnotationChange({
                  ...annotation,
                  tagKeys: event.currentTarget.value,
                });
              }}
              placeholder="label1,label2"
            ></input>
          </div>
          <div className="gf-form-inline">
            <div className="gf-form">
              <span className="gf-form-label width-5">Text</span>
              <input
                type="text"
                className="gf-form-input max-width-9"
                value={textFormat}
                onChange={(event) => {
                  onAnnotationChange({
                    ...annotation,
                    textFormat: event.currentTarget.value,
                  });
                }}
                placeholder="instance"
              ></input>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
