provider "google" {
  credentials = file("../../gcpCredentialsFile.json")
  project     = "taxi-service-112233"
  region      = "eu-west1"
}

resource "google_container_cluster" "taxi-cluster" {
  name     = "taxi-cluster"
  location = "eu-west1"

  remove_default_node_pool = true
  initial_node_count = 1

  node_pool {
    name       = "default-pool"
    node_count = 3

    node_config {
      machine_type = "n1-standard-1"
    }
  }
}
