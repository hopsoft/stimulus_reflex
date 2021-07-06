# frozen_string_literal: true

require_relative "test_helper"

class StimulusReflex::ElementTest < ActiveSupport::TestCase
  element = StimulusReflex::Element.new({
    "attrs" => {
      "user" => "First User",
      "user-id" => "1"
    },
    "dataset" => {
      "dataset" => {
        "data-post" => "The Post",
        "data-post-id" => "2"
      },
      "datasetAll" => {}
    }
  })

  test "should be able to access attributes on element itself" do
    assert_equal "First User", element.user
    assert_equal "First User", element["user"]
    assert_equal "First User", element[:user]

    assert_equal "1", element.user_id
    assert_equal "1", element["user_id"]
    assert_equal "1", element["user-id"]
    assert_equal "1", element[:user_id]

    assert_equal "The Post", element.data_post
    assert_equal "The Post", element["data_post"]
    assert_equal "The Post", element["data-post"]
    assert_equal "The Post", element[:data_post]

    assert_equal "2", element.data_post_id
    assert_equal "2", element["data_post_id"]
    assert_equal "2", element["data-post-id"]
    assert_equal "2", element[:data_post_id]
  end

  test "should be able to access attributes via attributes" do
    assert_equal "First User", element.attributes.user
    assert_equal "First User", element.attributes["user"]
    assert_equal "First User", element.attributes[:user]

    assert_equal "1", element.attributes.user_id
    assert_equal "1", element.attributes["user_id"]
    assert_equal "1", element.attributes["user-id"]
    assert_equal "1", element.attributes[:user_id]
  end

  test "should be able to access attributes via dataset" do
    assert_equal "The Post", element.dataset.post
    assert_equal "The Post", element.dataset["post"]
    assert_equal "The Post", element.dataset[:post]

    assert_equal "2", element.dataset.post_id
    assert_equal "2", element.dataset["post-id"]
    assert_equal "2", element.dataset["post_id"]
    assert_equal "2", element.dataset[:post_id]
  end

  test "should be able to access attributes via data_attributes" do
    assert_equal "The Post", element.data_attributes.post
    assert_equal "The Post", element.data_attributes["post"]
    assert_equal "The Post", element.data_attributes[:post]

    assert_equal "2", element.data_attributes.post_id
    assert_equal "2", element.data_attributes["post-id"]
    assert_equal "2", element.data_attributes["post_id"]
    assert_equal "2", element.data_attributes[:post_id]
  end

  test "should pluralize keys from datasetAll" do
    data = {
      "dataset" => {
        "dataset" => {
          "data-reflex" => "click",
          "data-sex" => "male"
        },
        "datasetAll" => {
          "data-reflex" => ["click"],
          "data-post-id" => ["1", "2", "3", "4"],
          "data-name" => ["steve", "bill", "steve", "mike"]
        }
      }
    }

    dataset_all_element = StimulusReflex::Element.new(data)

    assert_equal "click", dataset_all_element.dataset.reflex
    assert_equal "male", dataset_all_element.dataset.sex

    assert_equal ["steve", "bill", "steve", "mike"], dataset_all_element.dataset.names
    assert_equal ["1", "2", "3", "4"], dataset_all_element.dataset.post_ids
    assert_equal ["click"], dataset_all_element.dataset.reflexes
  end

  test "should pluralize irregular words from datasetAll" do
    data = {
      "dataset" => {
        "dataset" => {},
        "datasetAll" => {
          "data-cat" => ["cat"],
          "data-child" => ["child"],
          "data-women" => ["woman"],
          "data-man" => ["man"],
          "data-wolf" => ["wolf"],
          "data-library" => ["library"],
          "data-mouse" => ["mouse"]
        }
      }
    }

    pluralize_element = StimulusReflex::Element.new(data)

    assert_equal ["cat"], pluralize_element.dataset.cats
    assert_equal ["child"], pluralize_element.dataset.children
    assert_equal ["woman"], pluralize_element.dataset.women
    assert_equal ["man"], pluralize_element.dataset.men
    assert_equal ["wolf"], pluralize_element.dataset.wolves
    assert_equal ["library"], pluralize_element.dataset.libraries
    assert_equal ["mouse"], pluralize_element.dataset.mice
  end

  test "should not pluralize plural key" do
    data = {
      "dataset" => {
        "datasetAll" => {
          "data-ids" => ["1", "2"]
        }
      }
    }

    assert_equal ["1", "2"], StimulusReflex::Element.new(data).dataset.ids
    assert_nil StimulusReflex::Element.new(data).dataset.idss
  end

  test "should not build array with pluralized key" do
    data = {
      "dataset" => {
        "dataset" => {
          "data-ids" => "1"
        }
      }
    }

    assert_equal "1", StimulusReflex::Element.new(data).dataset.ids
  end

  test "should handle overlapping singluar and plural key names" do
    data = {
      "dataset" => {
        "dataset" => {
          "data-id" => "1",
          "data-ids" => "2",
          "data-post-id" => "9",
          "data-post-ids" => "10",
          "data-duplicate-value" => "19",
          "data-duplicate-values" => "20"
        },
        "datasetAll" => {
          "data-id" => ["3", "4"],
          "data-post-ids" => ["11", "12"],
          "data-duplicate-value" => ["20", "21", "22"]
        }
      }
    }

    overlapping_keys_element = StimulusReflex::Element.new(data)

    assert_equal "1", overlapping_keys_element.dataset.id
    assert_equal ["2", "3", "4"], overlapping_keys_element.dataset.ids

    assert_equal "9", overlapping_keys_element.dataset.post_id
    assert_equal ["10", "11", "12"], overlapping_keys_element.dataset.post_ids

    assert_equal "19", overlapping_keys_element.dataset.duplicate_value
    assert_equal ["20", "20", "21", "22"], overlapping_keys_element.dataset.duplicate_values
  end

  test "should return true for truthy data attributes" do
    data = {
      "dataset" => {
        "dataset" => {
          "data-short" => "t",
          "data-long" => "true",
          "data-num" => "1",
          "data-empty" => ""
        }
      }
    }

    element_with_truthy_attributes = StimulusReflex::Element.new(data)

    assert element_with_truthy_attributes.truthy?[:short]
    assert element_with_truthy_attributes.truthy?[:long]
    assert element_with_truthy_attributes.truthy?[:num]
    assert element_with_truthy_attributes.truthy?[:empty]
  end

  test "should return false for falsey data attributes" do
    data = {
      "dataset" => {
        "dataset" => {
          "data-short" => "f",
          "data-long" => "false",
          "data-num" => "0"
        }
      }
    }

    element_with_falsey_attributes = StimulusReflex::Element.new(data)

    refute element_with_falsey_attributes.truthy?[:short]
    refute element_with_falsey_attributes.truthy?[:long]
    refute element_with_falsey_attributes.truthy?[:num]
  end

  test "should return numeric values" do
    data = {
      "dataset" => {
        "dataset" => {
          "data-int" => "123",
          "data-float" => "123.456",
          "data-string" => "asdf"
        }
      }
    }

    element_with_numeric_attributes = StimulusReflex::Element.new(data)

    assert_equal 123.0, element_with_numeric_attributes.numeric[:int]
    assert_equal 123.456, element_with_numeric_attributes.numeric[:float]
    assert_raises do
      element_with_numeric_attributes.numeric[:string]
    end
  end
end
