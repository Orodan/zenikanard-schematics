import { buildDefaultPath } from '@schematics/angular/utility/project';
import { getWorkspace } from '@schematics/angular/utility/config';
import { Rule, SchematicContext, Tree, apply, url, move, mergeWith, MergeStrategy, template } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function zenikanardSchematics(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    setupOptions(tree, _options);

    const movePath = _options.path + '/' + strings.dasherize(_options.name);
    
    const templateSource = apply(url('./files'), [
      template({
        ...strings,
        ..._options
      }),
      move(movePath)
    ]);

    const rule = mergeWith(templateSource, MergeStrategy.Default);

    return rule(tree, _context);
  };
}

function setupOptions (tree: Tree, options: any) {
  // GET WORKSPACE
  const workspace = getWorkspace(tree);

  // GET PROJECT
  if (!options.project) {
    options.project = Object.keys(workspace.projects)[0];
  }
  const project = workspace.projects[options.project];

  // GET PATH
  if (!options.path) {
    options.path = buildDefaultPath(project);
  }

  return tree;
}
