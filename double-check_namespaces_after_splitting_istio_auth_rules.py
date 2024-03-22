#########################
## Looks in authorization.yaml, collects all namspaces allowed.
## Then it looks in the yaml files in the authorization/*.yaml files for the same NS's
## Does not excude kustomization.yaml in the auth dir, so throws a little error when it gets to that one.
########################

import os
import yaml

def get_namespaces(file):
    with open(file, 'r') as stream:
        try:
            data = yaml.safe_load(stream)
            return data['spec']['rules'][0]['from'][0]['source']['namespaces']
        except yaml.YAMLError as exc:
            print(exc)
        except KeyError as exc:
            print(f"Key {exc} not found in file {file}")

def check_namespaces(namespaces, directory):
    missing_namespaces = set(namespaces)
    for filename in os.listdir(directory):
        if filename.endswith(".yaml"):
            file_namespaces = get_namespaces(os.path.join(directory, filename))
            if file_namespaces is not None:
                for namespace in namespaces:
                    if namespace in file_namespaces:
                        print(f"Namespace {namespace} exists in the new files.")
                        missing_namespaces.discard(namespace)

    print("\nNamespaces not found in the new files:")
    for namespace in missing_namespaces:
        print(namespace)

namespaces = get_namespaces('authorization.yaml')
check_namespaces(namespaces, 'authorization')

