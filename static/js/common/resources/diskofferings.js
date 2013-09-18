// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

angular.module('resources.diskofferings', ['services.helperfunctions', 'services.requester']);
angular.module('resources.diskofferings').factory('DiskOfferings', ['DiskOffering', 'makeArray', 'requester', 'setState', function(DiskOffering, makeArray, requester, setState){
    var pagesize = 20;

    var DiskOfferings = function(discOfferings, state){
        this.collection = discOfferings;
        this.state = setState(state);
    }
    
    //Class methods
    DiskOfferings.prototype.list = function(){
        return this.collection;
    }

    DiskOfferings.prototype.loadNextPage = function(){
        var self = this;
        var params = {
            page: this.state.page + 1,
            pagesize: pagesize,
        };
        if(this.state.keyword){
            //Keyword is defined
            //Add it to params
            params.keyword = this.state.keyword;
        }

        return requester.get('listDiskOfferings', params)
            .then(function(response){
                return response.data.listdiskofferingsresponse.diskoffering;
            }).then(makeArray(DiskOffering)).then(function(diskofferings){
                if(diskofferings.length){
                    self.state.page++;
                    self.collection = self.collection.concat(diskofferings);
                };
            });
    }

    //Static Methods

    DiskOfferings.getFirstPage = function(){
        return requester.get('listDiskOfferings', {
            page: 1,
            pagesize: pagesize
        }).then(function(response){
            return response.data.listdiskofferingsresponse.diskoffering;
        }).then(makeArray(DiskOffering)).then(function(collection){
            return new DiskOfferings(collection, {page: 1});
        });
    }

    DiskOfferings.getAll = function(){
        return requester.get('listDiskOfferings').then(function(response){
            return response.data.listdiskofferingsresponse.diskoffering
        }).then(makeArray(DiskOffering)).then(function(collection){
            return new DiskOfferings(collection);
        });
    };
    return DiskOfferings;
}]);

angular.module('resources.diskofferings').factory('DiskOffering', function(){
    var DiskOffering = function(attrs){
        angular.extend(this, attrs);
    };
    return DiskOffering;
});